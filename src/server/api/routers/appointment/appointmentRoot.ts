import "server-only"

import { createTRPCRouter } from "../../trpc";
import createAppointment from "./createAppointment";
import GetAppointmentsProcedure from "./getAppointments";
import deleteAppointmentProcedure from "./deleteAppointment";
import CheckAppointmentProcedure from "./pubProcedures/CheckAppointment";

const appointmentRouter = createTRPCRouter({

    createAppointment: createAppointment,
    getAppointments: GetAppointmentsProcedure,
    deleteAppointment: deleteAppointmentProcedure,
    CheckAppointment: CheckAppointmentProcedure


});


export default appointmentRouter;