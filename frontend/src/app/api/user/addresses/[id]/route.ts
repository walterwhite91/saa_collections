import { createClient } from "@/lib/supabase/server";
import { updateAddressSchema } from "@/lib/validations/profile";

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
    const result = updateAddressSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updates: Record<string, unknown> = {};
    if (result.data.label !== undefined) updates.label = result.data.label;
    if (result.data.fullName !== undefined) updates.full_name = result.data.fullName;
    if (result.data.phone !== undefined) updates.phone = result.data.phone;
    if (result.data.streetLine1 !== undefined) updates.street_line1 = result.data.streetLine1;
    if (result.data.streetLine2 !== undefined) updates.street_line2 = result.data.streetLine2;
    if (result.data.city !== undefined) updates.city = result.data.city;
    if (result.data.state !== undefined) updates.state = result.data.state;
    if (result.data.postalCode !== undefined) updates.postal_code = result.data.postalCode;
    if (result.data.country !== undefined) updates.country = result.data.country;
    if (result.data.isDefault !== undefined) {
      if (result.data.isDefault) {
        await supabase
          .from("addresses")
          .update({ is_default: false })
          .eq("user_id", user.id);
      }
      updates.is_default = result.data.isDefault;
    }

    const { data, error } = await supabase
      .from("addresses")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ address: data });
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
      .from("addresses")
      .delete()
      .eq("id", id)
      .eq("user_id", user.id);

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ message: "Address deleted" });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
