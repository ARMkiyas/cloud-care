import "server-only";
import { createTRPCRouter } from "../../trpc";
import schedulePUBProcedure from "./publicProcedures/schedulePUBProcedure";
import scheduleCreateProcedure from "./scheduleCreateProcedure";
import scheduleDeleteProcedure from "./scheduleDeleteProcedure";
import scheduleGetProcedure from "./scheduleGetProcedure";
import scheduleUpdateProcedure from "./scheduleUpdateProcedure";


const scheduleRouter = createTRPCRouter({

    create: scheduleCreateProcedure,
    get: scheduleGetProcedure,
    delete: scheduleDeleteProcedure,
    update: scheduleUpdateProcedure,
    getPublic: schedulePUBProcedure


})


export default scheduleRouter