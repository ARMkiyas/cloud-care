/**
 * This is the primary router for server.
 *
 * All routers added in /api/routers should be manually added here.
 */
import "server-only"
import { exampleRouter } from "./routers/example";
import { request2faotp } from "./routers/helper_apis/request2faotp";

import { createTRPCRouter } from "./trpc";
import manageUsersRouter from "./routers/mangeUsers.ts/manageUsersRoot";
import manageStaffRouter from "./routers/mangeStaffs/manageStaffRoot";
import appointmentRouter from "./routers/appointment/appointmentRoot";
import scheduleRouter from "./routers/schedule/scheduleRouter";
import PasswordResetRouter from "./routers/authApis/ResetPwd";
import { profileRouter } from "./routers/profile/Profile";
import { requestimgUploadLink } from "./routers/helper_apis/requestimgUploadLink";


// This is the primary router for server. All routers added in /api/trpc/[Routers] should be manually added here.
export const appRouter = createTRPCRouter({
    // End point for this is /api/trpc/example
    example: exampleRouter,
    request2faotp: request2faotp,
    manageStaff: manageStaffRouter,
    manageUsers: manageUsersRouter,
    schedule: scheduleRouter,
    appointment: appointmentRouter,
    pwdreset: PasswordResetRouter,
    profile: profileRouter,

    requestimgUploadLink: requestimgUploadLink,

})




// Export type definition of API
export type AppRouterType = typeof appRouter;