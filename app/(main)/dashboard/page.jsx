import React from 'react';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { get } from 'react-hook-form';
import { getUserAccounts } from '@/actions/dashboard';
import AccountCard from './_components/account-card';



async function DashboardPage () {

  const accounts = await getUserAccounts();

  console.log(accounts);
  return (
    <div className='px-5'>
       
       {/* Budget Progress */}


       {/* Budget Overview */}
      
      {/* Accounts Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
        <CreateAccountDrawer>
            <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                <CardContent className="flex flex-col items-center justify-center h-full text-muted-foreground pt-5">
                    <Plus className='w-10 h-10 mb-2 text-gray-500' />
                    <p className='text-sm font-medium text-gray-500'>Create a new account</p>

                </CardContent>
            </Card>

        </CreateAccountDrawer>

        {accounts.length > 0 && accounts ?.map((account)=>{
          return <AccountCard key={account.id} account={account}/>
        })}
      </div>
    </div>
  )
}

export default DashboardPage;
