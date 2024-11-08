import { z } from "zod";

export const registerSchema = z.object({
  full_name: z.string({
    required_error: "Full name are required",
  }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Email is not valid",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
  role_id: z.enum(["S01", "A01", "C02"], {
      required_error: "Please select a valid role",
      invalid_type_error: "Please select a valid role",
    }).describe("Role must be one of: Supervisor, Auditor, or Ciudadano"),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
