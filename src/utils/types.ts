import { TAppointmentsGet, TUsersGet } from "@/server/api/ApiTypeFactory";

export type AppointmentDataType = TAppointmentsGet["data"][0];


export type UserDataType = TUsersGet["data"][0];