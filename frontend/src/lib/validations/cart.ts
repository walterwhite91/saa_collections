import { z } from "zod";

export const addToCartSchema = z.object({
  productId: z.string().uuid("Invalid product ID"),
  size: z.string().optional(),
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(10, "Maximum 10 per item"),
});

export const updateCartItemSchema = z.object({
  quantity: z.number().int().min(1, "Quantity must be at least 1").max(10, "Maximum 10 per item"),
});

export const mergeCartSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string().uuid("Invalid product ID"),
      size: z.string().optional(),
      quantity: z.number().int().min(1).max(10),
    })
  ),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type MergeCartInput = z.infer<typeof mergeCartSchema>;
