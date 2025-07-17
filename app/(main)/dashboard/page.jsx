import React from 'react';
import CreateAccountDrawer from '@/components/create-account-drawer';
import { CardContent } from '@/components/ui/card';
import { Card } from '@/components/ui/card';
import { Plus } from 'lucide-react';
import { get } from 'react-hook-form';
import { getUserAccounts } from '@/actions/dashboard';
import AccountCard from './_components/account-card';
import { getCurrentBudget } from '@/actions/budget';
import BudgetProgress from './_components/budget-progress';



async function DashboardPage () {

  const accounts = await getUserAccounts();
  const defaultAccount = accounts?.find((account)=>account.isDefault);

  let budgetData = null;
  if (defaultAccount) {
    budgetData = await getCurrentBudget(defaultAccount.id);
  }

  
  return (
    <div className='px-5'>
       
       {/* Budget Progress */}
     <BudgetProgress
        initialBudget={budgetData?.budget}
        currentExpenses={budgetData?.currentExpenses || 0}
      />

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
