import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import addUser from "./adduser";
import getUsers from "./getUsers";
import deleteUser from "./deleteUser";
import updateUser from "./updateUser";



const manageUsersRouter = createTRPCRouter({
    addUser: addUser,
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser,

});

export default manageUsersRouter;