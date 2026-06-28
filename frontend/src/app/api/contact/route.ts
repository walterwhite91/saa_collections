import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validations/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        { error: "Validation failed", details: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const supabase = await createClient();

    const { error } = await supabase.from("contact_inquiries").insert({
      name: result.data.name,
      email: result.data.email,
      subject: result.data.subject || null,
      order_number: result.data.orderNumber || null,
      message: result.data.message,
    });

    if (error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { message: "Your message has been sent. We will get back to you within 1-2 business days." },
      { status: 201 }
    );
  } catch {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
}
