// server side action for creating our account
'use server';
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma"; 
import { data } from "autoprefixer";
 import { revalidatePath } from "next/cache";


const serializeTransaction = (obj)=>{
    const serialized = {...obj};
    if(obj.balance){
        serialized.balance=obj.balance.toNumber();
    }
    if(obj.amount){
        serialized.amount=obj.amount.toNumber();
    }

    return serialized;
}
export async function createAccount(data){

    try{
        const {userId} = await auth();
        if(!userId){
            throw new Error("User not authenticated");
        }

        const user = await db.user.findUnique({
            where: {
                clerkUserId: userId   
            },
        });

        //convert balance to float 
        const balanceFloat = parseFloat(data.balance);
        if(isNaN(balanceFloat)){
            throw new Error("Invalid balance amount");
        }

        // check if this is the first account of user
        const existingAccounts = await db.account.findFirst({
            where: {
                userId: user.id
            }
        });

        const shouldBeDefault = !existingAccounts ? true :     data.isDefault;

        // if account is default , unset all the other default accounts
        if (shouldBeDefault) {
            await db.account.updateMany({
                where: { userId: user.id, isDefault: true },
                data: { isDefault: false },
        });
    }


        const account = await db.account.create({
            data: {
                ...data,
                type: data.type.toUpperCase(), // Ensure type is stored in uppercase
                balance: balanceFloat,
                userId: user.id,
                isDefault: shouldBeDefault,
            },
        });
    

        const serializedAccount = serializeTransaction(account);

        revalidatePath("/dashboard");
        return {success:true , data: serializedAccount};

    

    }catch(error){
        throw new Error(error.message)
    }
}



export async function getUserAccounts(){

    const {userId} = await auth();
    if(!userId){
        throw new Error("User not authenticated");
        }

    const user = await db.user.findUnique({
        where: {
            clerkUserId: userId   
        },
    });
    const accounts = await db.account.findMany({

        where: {
            userId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        include:{
            _count : {
                select: {   
                    transactions: true
                }  
            }     
        }

    });
    const serializedAccount = accounts.map(serializeTransaction); // runs serializeTransaction on each account  

    return serializedAccount;
}