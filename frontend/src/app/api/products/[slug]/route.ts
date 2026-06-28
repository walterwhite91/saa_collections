import { createClient } from "@/lib/supabase/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, slug, name)")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return Response.json({ error: "Product not found" }, { status: 404 });
  }

  return Response.json({ product: data });
}
