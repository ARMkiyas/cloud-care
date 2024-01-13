import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
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

  securehallo: protectedProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      const result = {
        greeting: `Hello ${input.text}`,
      };
      return result;
    }),




  // Add two numbers together.
  add: protectedProcedure
    .input(z.object({ a: z.number(), b: z.number() }))
    .mutation(({ input }) => {
      const result = {
        sum: input.a + input.b,
      };
      return result;
    }),

});
