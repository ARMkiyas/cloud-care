import { initTRPC } from "@trpc/server";





//create a new tprc instance
const t=initTRPC.create();





// createTRPCRouter is a function that creates a new router 
export const createTRPCRouter=t.router;
export const publicProcedure=t.procedure;