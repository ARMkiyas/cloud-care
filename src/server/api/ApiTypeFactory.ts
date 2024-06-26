import "server-only";
import type { AppRouterType } from "./root";
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { inferReactQueryProcedureOptions } from "@trpc/react-query";


export type ReactQueryOptions = inferReactQueryProcedureOptions<AppRouterType>;

export type RouterInputs = inferRouterInputs<AppRouterType>
export type RouterOutput = inferRouterOutputs<AppRouterType>;



//type of the 'getstaff' procedure
export type TStaffGet = RouterOutput["manageStaff"]["getStaff"];
export type TStaffGetInput = RouterInputs["manageStaff"]["getStaff"];

// type of the `createStaff` procedure
export type TStaffCreate = RouterOutput["manageStaff"]["createStaff"];
export type TStaffCreateInput = RouterInputs["manageStaff"]["createStaff"];

// type of the `updateStaff` procedure
export type TStaffUpdate = RouterOutput["manageStaff"]["updatestaff"];
export type TStaffUpdateInput = RouterInputs["manageStaff"]["updatestaff"];

// type of the `deleteStaff` procedure
export type TStaffDelete = RouterOutput["manageStaff"]["deleteStaff"];
export type TStaffDeleteInput = RouterInputs["manageStaff"]["deleteStaff"];







// type of the `getUsers` procedure
export type TUsersGet = RouterOutput["manageUsers"]["getUsers"];
export type TUsersGetInput = RouterInputs["manageUsers"]["getUsers"];

// type of the `createUser` procedure
export type TUsersCreate = RouterOutput["manageUsers"]["addUser"];
export type TUsersCreateInput = RouterInputs["manageUsers"]["addUser"];

// type of the `updateUser` procedure
export type TUsersUpdate = RouterOutput["manageUsers"]["updateUser"];
export type TUsersUpdateInput = RouterInputs["manageUsers"]["updateUser"];

// type of the `deleteUser` procedure
export type TUsersDelete = RouterOutput["manageUsers"]["deleteUser"];
export type TUsersDeleteInput = RouterInputs["manageUsers"]["deleteUser"];



// type of the `getSchedule` procedure
export type TScheduleGet = RouterOutput["schedule"]["get"];
export type TScheduleGetInput = RouterInputs["schedule"]["get"];

// type of the `createSchedule` procedure
export type TScheduleCreate = RouterOutput["schedule"]["create"];
export type TScheduleCreateInput = RouterInputs["schedule"]["create"];

// type of the `updateSchedule` procedure
export type TScheduleUpdate = RouterOutput["schedule"]["update"];
export type TScheduleUpdateInput = RouterInputs["schedule"]["update"];

// type of the `deleteSchedule` procedure
export type TScheduleDelete = RouterOutput["schedule"]["delete"];
export type TScheduleDeleteInput = RouterInputs["schedule"]["delete"];






// type of the `getAppointments` procedure
export type TAppointmentsGet = RouterOutput["appointment"]["getAppointments"];
export type TAppointmentsGetInput = RouterInputs["appointment"]["getAppointments"];

// type of the `createAppointment` procedure
export type TAppointmentsCreate = RouterOutput["appointment"]["createAppointment"];
export type TAppointmentsCreateInput = RouterInputs["appointment"]["createAppointment"];

// type of the `updateAppointment` procedure

export type TAppointmentsCheck = RouterOutput["appointment"]["CheckAppointment"];
export type TAppointmentsCheckInput = RouterInputs["appointment"]["CheckAppointment"];

// type of the `deleteAppointment` procedure
export type TAppointmentsDelete = RouterOutput["appointment"]["deleteAppointment"];
export type TAppointmentsDeleteInput = RouterInputs["appointment"]["deleteAppointment"];




