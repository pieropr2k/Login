import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({
    message: "Por favor, ingresa una dirección de correo válida",
  }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres",
  }),
});

export const registerSchema = z
  .object({
    last_names: z
      .string({
        required_error: "Los apellidos son obligatorios",
      })
      .min(3, {
        message: "Los apellidos deben tener al menos 3 caracteres",
      }),
    first_names: z
      .string({
        required_error: "Los nombres son obligatorios",
      })
      .min(3, {
        message: "Los nombres deben tener al menos 3 caracteres",
      }),
    email: z.string().email({
      message: "Por favor, ingresa una dirección de correo válida",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }), 
    confirmPassword: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }),

    role: z.enum(["S01", "A01", "C02"], "Selecciona un rol válido"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "Debes aceptar los términos y condiciones" }),
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });
