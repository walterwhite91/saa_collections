import { createClient } from "@/lib/supabase/server";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("wishlists")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: "Removed from wishlist" });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
