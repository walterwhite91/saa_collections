import { createClient } from "@/lib/supabase/server";
import { forgotPasswordSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = forgotPasswordSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email } = result.data;
    const supabase = await createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL ? new URL(request.url).origin : "http://localhost:3000"}/api/auth/callback?redirect=/login?reset=true`,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    // Always return success to prevent email enumeration
    return Response.json({
      message: "If an account exists with this email, a password reset link has been sent.",
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
