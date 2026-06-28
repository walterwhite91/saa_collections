import { createClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("wishlists")
      .select("*, product:products(*, category:categories(id, slug, name))")
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
    const { productId } = body;

    if (!productId) {
      return Response.json({ error: "Product ID is required" }, { status: 400 });
    }

    // Check if already in wishlist
    const { data: existing } = await supabase
      .from("wishlists")
      .select("id")
      .eq("user_id", user.id)
      .eq("product_id", productId)
      .maybeSingle();

    if (existing) {
      // Toggle: remove if already exists
      await supabase.from("wishlists").delete().eq("id", existing.id);
      return Response.json({ action: "removed", productId });
    }

    // Add to wishlist
    const { data, error } = await supabase
      .from("wishlists")
      .insert({ user_id: user.id, product_id: productId })
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ action: "added", item: data }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
