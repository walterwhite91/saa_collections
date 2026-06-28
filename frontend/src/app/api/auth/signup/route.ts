import { createClient } from "@/lib/supabase/server";
import { signUpSchema } from "@/lib/validations/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = signUpSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password, firstName, lastName } = result.data;
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    return Response.json({
      message: "Account created successfully. Please check your email to confirm your account.",
      user: data.user,
    });
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
