import { createClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = loginSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = result.data;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 401 });
    }

    return Response.json({
      message: "Login successful",
      user: data.user,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
