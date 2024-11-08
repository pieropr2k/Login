import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

export const registerSchema = z
  .object({
    last_names: z
      .string({
        required_error: "Last names is required",
      })
      .min(3, {
        message: "Last names must be at least 3 characters",
      }),
    first_names: z
      .string({
        required_error: "First names is required",
      })
      .min(3, {
        message: "First names must be at least 3 characters",
      }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }), 
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),

    role: z.enum(["S01", "A01", "C02"], "Selecciona un rol válido"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
