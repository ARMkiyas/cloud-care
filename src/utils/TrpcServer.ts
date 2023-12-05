import "server-only"

import { appRouter } from "@/server/api/root";


//creating a endpoint for internal server and serverside component , from this can access api in the server 
export const apiServer = appRouter.createCaller({});
