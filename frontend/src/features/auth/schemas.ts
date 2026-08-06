import { z } from "zod";

// ---- Shared primitives ----
const emailField = z
  .email("Enter a valid email address");

const passwordField = z
  .string()
  .min(1, "Password is required")
  .min(6, "Password must be at least 6 characters");

export const userRoleEnum = z.enum(["ADMIN", "USER"]);
export type UserRoleInput = z.infer<typeof userRoleEnum>;

// ---- Login ----
export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ---- Register ----
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Full name is required")
      .min(2, "Name must be at least 2 characters"),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: userRoleEnum,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ---- Forgot password ----
export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ---- Reset password ----
export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;