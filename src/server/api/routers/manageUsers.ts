import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";


const adduserschema = z.object({
    name: z.string()
});


const manageUsersRouter = createTRPCRouter({

    addUser: protectedProcedure.input(adduserschema).mutation(async ({ ctx }) => {


    }),

});

export default manageUsersRouter;