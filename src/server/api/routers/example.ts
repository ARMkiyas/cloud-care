import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
} from "../trpc";

// Create an example router for testing in trpc.
export const exampleRouter = createTRPCRouter({
  // Greet the user with a hello message.
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      const result = {
        greeting: `Hello ${input.text}`,
      };
      return result;
    }),
});
