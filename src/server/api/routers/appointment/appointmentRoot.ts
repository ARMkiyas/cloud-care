import { createTRPCRouter } from "../../trpc";
import createAppointment from "./createAppointment";

const appointmentRouter = createTRPCRouter({

    createAppointment: createAppointment


});


export default appointmentRouter;