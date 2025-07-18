import { getAccountWithTransactions } from '@/actions/accounts'
import React from 'react'
import { Suspense } from 'react'
import { BarLoader } from 'react-spinners'
import { TransactionTable } from '../_components/transaction-table'


import AccountCharts from '../_components/account-charts'


export default async function AccountsPage({params}) {

    const accountData = await getAccountWithTransactions(params.id)

    if(!accountData){
        notFound();
        
    
    }

    const {transactions , ...account} = accountData;
  return (
    <div>
    <div className="flex gap-4 items-end justify-between">
        <div>
        <h1 className="text-5xl sm:text-6xl font-bold tracking-tight gradient-title capitalize">
            {account.name}
          </h1>
        <p className="text-muted-foreground">
            {account.type.charAt(0) + account.type.slice(1).toLowerCase()}{" "}
            Account
          </p>
    </div>
    <div className="text-right pb-2">
          <div className="text-xl sm:text-2xl font-bold">
            ₹{parseFloat(account.balance).toFixed(2)}
          </div>
          <p className="text-sm text-muted-foreground">
            {account._count.transactions} Transactions
          </p>
        </div>
    </div>

    <Suspense
        fallback={<BarLoader className="mt-4" width={"100%"} color="#9333ea" />}
      >
        <AccountCharts transactions={transactions} />
        <TransactionTable transactions={transactions} />
      </Suspense>

    </div>
    
    

    
    
  )
}


