import { createClient } from "@/lib/supabase/server";
import { createAddressSchema } from "@/lib/validations/profile";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("addresses")
      .select("*")
      .eq("user_id", user.id)
      .order("is_default", { ascending: false })
      .order("created_at", { ascending: false });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ addresses: data });
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
    const result = createAddressSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // If this is the default address, unset other defaults
    if (result.data.isDefault) {
      await supabase
        .from("addresses")
        .update({ is_default: false })
        .eq("user_id", user.id);
    }

    const { data, error } = await supabase
      .from("addresses")
      .insert({
        user_id: user.id,
        label: result.data.label,
        full_name: result.data.fullName,
        phone: result.data.phone,
        street_line1: result.data.streetLine1,
        street_line2: result.data.streetLine2,
        city: result.data.city,
        state: result.data.state,
        postal_code: result.data.postalCode,
        country: result.data.country,
        is_default: result.data.isDefault,
      })
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ address: data }, { status: 201 });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
