import { z } from "zod";

export const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  line1: z.string().min(1, "Address line is required"),
  line2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(4, "Enter a valid postal code"),
  country: z.string().min(1, "Country is required"),
});