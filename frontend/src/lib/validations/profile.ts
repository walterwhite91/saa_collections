import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().max(50).optional(),
  lastName: z.string().max(50).optional(),
  phone: z.string().max(20).optional(),
});

export const createAddressSchema = z.object({
  label: z.string().max(50).default("Home"),
  fullName: z.string().min(1, "Full name is required").max(100),
  phone: z.string().max(20).optional(),
  streetLine1: z.string().min(1, "Street address is required").max(200),
  streetLine2: z.string().max(200).optional(),
  city: z.string().min(1, "City is required").max(100),
  state: z.string().max(100).optional(),
  postalCode: z.string().max(20).optional(),
  country: z.string().max(100).default("Nepal"),
  isDefault: z.boolean().default(false),
});

export const updateAddressSchema = createAddressSchema.partial();

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
