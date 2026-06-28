import { createClient } from "@/lib/supabase/server";

export async function GET(
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

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (error || !data) {
      return Response.json({ error: "Order not found" }, { status: 404 });
    }

    return Response.json({ order: data });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
