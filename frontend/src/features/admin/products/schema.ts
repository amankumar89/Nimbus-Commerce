import { z } from "zod";

export const productFormSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
  discountPrice: z.coerce.number().nonnegative().optional(),
  stock: z.coerce.number().int().nonnegative("Stock cannot be negative"),
  description: z.string().min(1, "Description is required"),
  images: z.string().min(1, "At least one image URL is required"), // comma-separated for now
});