import { createClient } from "@/lib/supabase/server";
import { createOrderSchema } from "@/lib/validations/order";

function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SAA-${timestamp}-${random}`;
}

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ orders: data });
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
    const result = createOrderSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Get cart items
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select("*, product:products(*)")
      .eq("user_id", user.id);

    if (cartError || !cartItems || cartItems.length === 0) {
      return Response.json({ error: "Cart is empty" }, { status: 400 });
    }

    // Calculate totals from actual product prices (not client-provided)
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.product?.price || 0) * item.quantity,
      0
    );
    const shippingCost = 0; // Free shipping
    const tax = 0;
    const total = subtotal + shippingCost + tax;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        order_number: generateOrderNumber(),
        user_id: user.id,
        email: user.email!,
        status: "pending",
        subtotal,
        shipping_cost: shippingCost,
        tax,
        total,
        shipping_address: result.data.shippingAddress,
        billing_address: result.data.billingAddress || result.data.shippingAddress,
        notes: result.data.notes,
      })
      .select()
      .single();

    if (orderError || !order) {
      return Response.json({ error: "Failed to create order" }, { status: 500 });
    }

    // Create order items
    const orderItems = cartItems.map((item) => ({
      order_id: order.id,
      product_id: item.product_id,
      product_name: item.product?.name || "Unknown Product",
      product_image: item.product?.image || null,
      size: item.size,
      quantity: item.quantity,
      unit_price: item.product?.price || 0,
      total_price: (item.product?.price || 0) * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (itemsError) {
      // Rollback order if items fail
      await supabase.from("orders").delete().eq("id", order.id);
      return Response.json({ error: "Failed to create order items" }, { status: 500 });
    }

    // Clear cart
    await supabase.from("cart_items").delete().eq("user_id", user.id);

    return Response.json({ order }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
