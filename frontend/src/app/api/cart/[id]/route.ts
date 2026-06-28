import { createClient } from "@/lib/supabase/server";
import { updateCartItemSchema } from "@/lib/validations/cart";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateCartItemSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("cart_items")
      .update({ quantity: result.data.quantity })
      .eq("id", id)
      .eq("user_id", user.id)
      .select("*, product:products(*)")
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ item: data });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { error } = await supabase
      .from("cart_items")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: "Item removed from cart" });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
