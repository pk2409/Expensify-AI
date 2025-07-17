import { serve } from "inngest/next";

import { inngest } from "@/app/lib/inngest/client";
// import { Inngest } from "inngest";

// import {
//   checkBudgetAlerts,
//   generateMonthlyReports,
//   processRecurringTransaction,
//   triggerRecurringTransactions,
// } from "@/lib/inngest/function";


import { checkBudgetAlerts, generateMonthlyReports, processRecurringTransaction, triggerRecurringTransactions } from "./functions";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    checkBudgetAlerts , triggerRecurringTransactions , processRecurringTransaction , generateMonthlyReports
  ],
});