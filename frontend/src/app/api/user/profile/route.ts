import { createClient } from "@/lib/supabase/server";
import { updateProfileSchema } from "@/lib/validations/profile";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({
      profile: {
        ...data,
        email: user.email,
      },
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const result = updateProfileSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const updates: Record<string, string | undefined> = {};
    if (result.data.firstName !== undefined) updates.first_name = result.data.firstName;
    if (result.data.lastName !== undefined) updates.last_name = result.data.lastName;
    if (result.data.phone !== undefined) updates.phone = result.data.phone;

    const { data, error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", user.id)
      .select()
      .single();

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ profile: data });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
