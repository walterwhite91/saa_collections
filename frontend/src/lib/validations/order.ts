import { z } from "zod";

const addressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().optional(),
  streetLine1: z.string().min(1, "Street address is required"),
  streetLine2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().default("Nepal"),
});

export const createOrderSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema.optional(),
  notes: z.string().max(500).optional(),
});

export type CreateOrderInput = z.infer<typeof createOrderSchema>;
