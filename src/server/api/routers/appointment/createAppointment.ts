import { z } from "zod";
import { publicProcedure } from "../../trpc";

const createAppointmentSchema = z.object({
    id: z.string()
})


const createAppointment = publicProcedure.input(createAppointmentSchema).mutation(({ input }) => {

})


export default createAppointment