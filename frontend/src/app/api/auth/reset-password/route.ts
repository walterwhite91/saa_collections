import { createClient } from "@/lib/supabase/server";
import { resetPasswordSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = resetPasswordSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { password } = result.data;
    const supabase = await createClient();

    // Verify user is authenticated (via reset token in session)
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return Response.json({ error: "Invalid or expired reset token" }, { status: 401 });
    }

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({ message: "Password updated successfully" });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
