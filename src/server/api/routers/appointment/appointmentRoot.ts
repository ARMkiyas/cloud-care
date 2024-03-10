import "server-only"

import { createTRPCRouter } from "../../trpc";
import createAppointment from "./createAppointment";
import GetAppointmentsProcedure from "./getAppointments";
import deleteAppointmentProcedure from "./deleteAppointment";
import CheckAppointmentProcedure from "./pubProcedures/CheckAppointment";
import EditAppointmentProcedure from "./EditAppointment";

const appointmentRouter = createTRPCRouter({

    createAppointment: createAppointment,
    getAppointments: GetAppointmentsProcedure,
    deleteAppointment: deleteAppointmentProcedure,
    CheckAppointment: CheckAppointmentProcedure,
    editAppointment: EditAppointmentProcedure


});


export default appointmentRouter;