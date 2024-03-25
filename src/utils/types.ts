import { TAppointmentsGet, TUsersGet } from "@/server/api/ApiTypeFactory";
import { stafftypes } from "./comonDatas";

export type AppointmentDataType = TAppointmentsGet["data"][0];

export type StaffDataType = TUsersGet["data"][0];

export type UserDataType = TUsersGet["data"][0];


export type TStaffTypes = (typeof stafftypes)[number]