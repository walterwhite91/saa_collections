import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().optional(),
  orderNumber: z.string().optional(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
});

export type ContactInput = z.infer<typeof contactSchema>;
