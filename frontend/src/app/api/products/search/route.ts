import { createClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q");

  if (!q || q.trim().length < 2) {
    return Response.json({ products: [] });
  }

  const supabase = await createClient();
  const searchTerm = `%${q.trim()}%`;

  const { data, error } = await supabase
    .from("products")
    .select("*, category:categories(id, slug, name)")
    .eq("in_stock", true)
    .or(`name.ilike.${searchTerm},description.ilike.${searchTerm}`)
    .limit(10);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ products: data });
}
