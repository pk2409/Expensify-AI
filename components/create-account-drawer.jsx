'use client';
import { useForm } from "react-hook-form";
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "./ui/drawer";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from 'react'
import { accountSchema } from "@/app/lib/schema";
import { Input } from "./ui/input";
import { Button } from "./ui/button";




import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { createAccount, serializeTransaction } from "@/actions/dashboard";
import { Switch } from "./ui/switch";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateAccountDrawer = ({children}) => {

    const [open,setOpen] = useState(false); // State to control the drawer visibility


    // register will connect the form inputs to the react-hook-form library
    // resolver will use Zod to validate the form inputs against the schema defined in schema.js
    // defaultValues will set the initial values of the form inputs
    const {register , handleSubmit , formState:{errors},setValue , watch ,reset} = useForm({
        resolver : zodResolver(accountSchema), // Using Zod for form validation
        defaultValues: {
            name: "",
            type: "CURRENT",
            balance: "",        
            isDefault: false,
    },
});


const {data:newAccount,error,fn:createAccountFn,loading:createAccountLoading} =  useFetch(createAccount);


useEffect(() =>{
    if(newAccount && !createAccountLoading){
        toast.success("Account created successfully");
        reset();
        setOpen(false);
    }},[createAccountLoading,newAccount,error]);   


useEffect(() => {
    if(error){
        toast.error(error.message);
    }
},[error]);

const onSubmit = async (data) => {
    await createAccountFn(data);

}


  return (
    <Drawer open = {open} onOpenChange={setOpen}> 
    

  <DrawerTrigger asChild>{children}</DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Create a New Account</DrawerTitle>
    </DrawerHeader>
    <div className="px-4 pb-4">
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-600 space-y-4">Account Name</label>
                <Input id="name"   placeholder="main"
                {...register("name")}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="type" className="text-sm font-medium text-gray-600 space-y-4">Account Type</label>
                <Select onValueChange ={(value)=>setValue("type",value)} defaultValue={watch("type")}>
                    <SelectTrigger id="type" className="w-full">
                        <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="CURRENT">Current</SelectItem>
                        <SelectItem value="SAVINGS">Savings</SelectItem>
                    </SelectContent>
                </Select>
                {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>

            <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-600 space-y-4">Initial Balance</label>
                <Input id="balance"   type="number" placeholder="0.00" step="0.01"
                {...register("balance")}
                />
                {errors.balance && <p className="text-red-500 text-sm">{errors.balance.message}</p>}
            </div>

            <div className="flex items-center justify-between rounded-lg border p-3">
                <div className="space-y-0.5">
                    <label htmlFor="isDefault" className="text-sm font-medium cursor-pointer">Set as Default</label>
                    <p className="text-sm text-muted-foreground ">This account will be selected by default for transactions</p>
                </div>
                <Switch id="isDefault" onCheckedChange={(checked) => setValue("isDefault",checked)}
                    checked = {watch("isDefault")}/>
                
            </div>

            <div >
                <DrawerClose asChild>
                    <Button type="button" variant ="outline" className="flex-1">Cancel</Button>
                </DrawerClose>

                <Button type="submit" className="flex-1" disabled={createAccountLoading} > 
                    {createAccountLoading? (<> <Loader2 className = "mr-2 h-4 w-4 animate-spin" /> Creating ...</>): ("Create Account")}
                </Button>
            </div>
        </form>
    </div>
    
    
  </DrawerContent>
</Drawer>
  )
}

export default CreateAccountDrawer
