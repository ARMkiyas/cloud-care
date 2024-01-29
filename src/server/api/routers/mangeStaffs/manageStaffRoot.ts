
import "server-only"
import { createTRPCRouter } from "@server/api/trpc";
import getStaffProceture from "./getStaff";
import createStaffProceture from "./createStaff";
import deleteStaffProceture from "./deleteStaff";
import updatestaffProceture from "./updatestaff";


const manageStaffRouter = createTRPCRouter({

    getStaff: getStaffProceture,
    createStaff: createStaffProceture,
    deleteStaff: deleteStaffProceture,
    updatestaff: updatestaffProceture


})




export default manageStaffRouter    
