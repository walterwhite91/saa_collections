import { createClient } from "@/lib/supabase/server";
import { addToCartSchema } from "@/lib/validations/cart";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

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

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = addToCartSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { productId, size, quantity } = result.data;

    // Check if product exists
    const { data: product } = await supabase
      .from("products")
      .select("id")
      .eq("id", productId)
      .single();

    if (!product) {
      return Response.json({ error: "Product not found" }, { status: 404 });
    }

    // Upsert: if same product+size exists, increment quantity
    const { data: existing } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .eq("size", size || "")
      .maybeSingle();

    let data;
    let error;

    if (existing) {
      const newQuantity = Math.min(existing.quantity + quantity, 10);
      ({ data, error } = await supabase
        .from("cart_items")
        .update({ quantity: newQuantity })
        .eq("id", existing.id)
        .select("*, product:products(*)")
        .single());
    } else {
      ({ data, error } = await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          product_id: productId,
          size: size || null,
          quantity,
        })
        .select("*, product:products(*)")
        .single());
    }

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ item: data }, { status: existing ? 200 : 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
