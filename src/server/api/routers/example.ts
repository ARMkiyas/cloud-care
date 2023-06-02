import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../trpc";


// creating a example router for testing in trpc
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
});
