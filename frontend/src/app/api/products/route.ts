import { createClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const searchParams = request.nextUrl.searchParams;

  // Build query
  let query = supabase
    .from("products")
    .select("*, category:categories(id, slug, name)")
    .eq("in_stock", true);

  // Filter by category slug
  const category = searchParams.get("category");
  if (category) {
    const { data: cat } = await supabase
      .from("categories")
      .select("id")
      .eq("slug", category)
      .single();
    if (cat) {
      query = query.eq("category_id", cat.id);
    }
  }

  // Filter by featured
  const featured = searchParams.get("featured");
  if (featured === "true") {
    query = query.eq("featured", true);
  }

  // Filter by best seller
  const bestSeller = searchParams.get("best_seller");
  if (bestSeller === "true") {
    query = query.eq("best_seller", true);
  }

  // Filter by new
  const isNew = searchParams.get("is_new");
  if (isNew === "true") {
    query = query.eq("is_new", true);
  }

  // Price range
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");
  if (minPrice) query = query.gte("price", parseInt(minPrice));
  if (maxPrice) query = query.lte("price", parseInt(maxPrice));

  // Sorting
  const sort = searchParams.get("sort");
  switch (sort) {
    case "price_asc":
      query = query.order("price", { ascending: true });
      break;
    case "price_desc":
      query = query.order("price", { ascending: false });
      break;
    case "newest":
      query = query.order("created_at", { ascending: false });
      break;
    case "name_asc":
      query = query.order("name", { ascending: true });
      break;
    default:
      query = query.order("created_at", { ascending: false });
  }

  // Pagination
  const limit = parseInt(searchParams.get("limit") || "50");
  const offset = parseInt(searchParams.get("offset") || "0");
  query = query.range(offset, offset + limit - 1);

  const { data, error, count } = await query;

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ products: data, count });
}
