import { initTRPC } from "@trpc/server";




// creating trpc api  
const t=initTRPC.create();



export const createTRPCRouter=t.router;
export const publicProcedure=t.procedure;