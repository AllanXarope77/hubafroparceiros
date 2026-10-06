export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    const { key } = await params;
    if (!/^product-color-[a-f0-9-]+\.(jpg|png|webp)$/i.test(key)) return new Response("Imagem inválida.", { status: 400 });
    const legacyBase = process.env.LEGACY_PRODUCT_IMAGES_BASE_URL?.replace(/\/$/, "");
    if (!legacyBase) return new Response("Imagem legada não configurada.", { status: 404 });
    const response = await fetch(`${legacyBase}/api/product-images/${key}`, { cache: "force-cache" });
    if (!response.ok || !response.body) return new Response("Imagem não encontrada.", { status: 404 });
    const headers = new Headers({
      "Cache-Control": "public, max-age=86400",
      "Content-Type": response.headers.get("Content-Type") || "application/octet-stream",
    });
    return new Response(response.body, { headers });
  } catch {
    return new Response("Não foi possível carregar a imagem.", { status: 500 });
  }
}
