'use client';

import { endOfDay, startOfDay, subDays } from 'date-fns';
import React, { useMemo, useState } from 'react'
import { ResponsiveContainer,BarChart,CartesianGrid , XAxis , YAxis,Tooltip ,Bar ,Legend} from 'recharts';
import { Card,CardContent,CardDescription,CardAction,CardTitle,ResponsiveContainer, } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';



const DATE_RANGES = {
  "7D": { label: "Last 7 Days", days: 7 },
  "1M": { label: "Last Month", days: 30 },
  "3M": { label: "Last 3 Months", days: 90 },
  "6M": { label: "Last 6 Months", days: 180 },
  ALL: { label: "All Time", days: null },
};


const AccountCharts = (transactions) => {

    const [dateRange,setDateRange] = useState("1M")

    const filteredData = useMemo(()=>{

        const range = DATE_RANGES[dateRange];

        const now = new Date();

        const startDate = range.days? startOfDay(subDays(now,range.days)) : startOfDay(new Date(0));

        const filtered = transactions.filter(
            (t) => new Date(t.date) >= startDate && new Date(t.date) <= endOfDay(now)

        );

        const grouped = filtered.reduce((acc,transaction)=>{

            const date = format(new Date(transaction.date),"MMM dd");

            if(!acc[date]){
                acc[date]={date,income:0,expense:0};
            }

            if(transaction.type === 'INCOME'){
                acc[date].income +=transaction.amount;
            }else{
                acc[date].expense +=transaction.amount;
            }

            return acc;

        },{});

        return Object.values(grouped).sort(
            (a,b)=> new Date(a.date) - new Date(b.date)
        )
    },[transactions,dateRange])

    const totals = useMemo(() => {
    return filteredData.reduce(
      (acc, day) => ({
        income: acc.income + day.income,
        expense: acc.expense + day.expense,
      }),
      { income: 0, expense: 0 }
    );
  }, [filteredData]);


    console.log(filteredData);
    console.log("lol")

    
  return (

    <Card>
  <CardHeader>
    <CardTitle>Transaction Overview</CardTitle>
    <Select defaultValue = {dateRange} onValueChange={setDateRange}>
  <SelectTrigger className="w-[180px]">
    <SelectValue placeholder="Theme" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>
  </CardHeader>
  <CardContent>
    <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
        </BarChart>
      </ResponsiveContainer>
  </CardContent>
 
</Card>
      
    
  )
}

export default AccountCharts;
