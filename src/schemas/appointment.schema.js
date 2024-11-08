import { z } from "zod";

export const createAppointmentSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  description: z.string().optional(),
  date: z.string().datetime().optional(),
});
