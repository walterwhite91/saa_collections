import { createClient } from "@/lib/supabase/server";
import { mergeCartSchema } from "@/lib/validations/cart";

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = mergeCartSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { items } = result.data;

    // Process each guest cart item
    for (const item of items) {
      // Check if product exists
      const { data: product } = await supabase
        .from("products")
        .select("id")
        .eq("id", item.productId)
        .single();

      if (!product) continue;

      // Check for existing cart entry with same product+size
      const { data: existing } = await supabase
        .from("cart_items")
        .select("id, quantity")
        .eq("user_id", user.id)
        .eq("product_id", item.productId)
        .eq("size", item.size || "")
        .maybeSingle();

      if (existing) {
        // Merge: take the higher quantity, capped at 10
        const newQuantity = Math.min(
          Math.max(existing.quantity, item.quantity),
          10
        );
        await supabase
          .from("cart_items")
          .update({ quantity: newQuantity })
          .eq("id", existing.id);
      } else {
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: item.productId,
          size: item.size || null,
          quantity: Math.min(item.quantity, 10),
        });
      }
    }

    // Return the merged cart
    const { data, error } = await supabase
      .from("cart_items")
      .select("*, product:products(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ items: data });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
