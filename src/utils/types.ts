import { TAppointmentsGet, TUsersGet } from "@/server/api/ApiTypeFactory";
import { stafftypes } from "./comonDatas";





export type AppointmentDataType = TAppointmentsGet["data"][0];

export type StaffDataType = TUsersGet["data"][0];

export type UserDataType = TUsersGet["data"][0];


export type TStaffTypes = (typeof stafftypes)[number]

export type reqT = "otp" | "pwd-reset" | "appointment"

type commonOTPPayloadT = {
    username: string;
    otp: string;
}

export type sendEmailOTPPayloadT = {

    email: string;


} & commonOTPPayloadT

export type sendMessageOTPPayloadT = {
    phoneNumber: string;
} & commonOTPPayloadT



type commonPWDResetPayloadT = {
    url: string;
    username: string;
}

export type SendPwdResetMailPayloadT = {
    email: string;
} & commonPWDResetPayloadT


export type SendPwdResetMessagePayloadT = {
    phoneNumber: string;
} & commonPWDResetPayloadT


export type appointmentNotificationT = "booking" | "checking" | "cancelled" | "completed" | "rescheduled";

export type commonAppointmentRequestPayloadT = {
    type: appointmentNotificationT
    date: string;
    patientName: string;
    doctorName: string;
    time: string;
    referenceId: string;
}


export type SendEmailAppointmentRequestPayloadT = {
    email: string;
} & commonAppointmentRequestPayloadT

export type SendMessageAppointmentPayloadT = {
    phoneNumber: string;
} & commonAppointmentRequestPayloadT

