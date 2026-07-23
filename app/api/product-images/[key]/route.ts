async function getBucket() {
  const { env } = await import("cloudflare:workers");
  const bucket = (env as unknown as { PRODUCT_IMAGES?: R2Bucket }).PRODUCT_IMAGES;
  if (!bucket) throw new Error("O armazenamento de imagens não está disponível.");
  return bucket;
}

export async function GET(_request: Request, { params }: { params: Promise<{ key: string }> }) {
  try {
    const { key } = await params;
    if (!/^product-color-[a-f0-9-]+\.(jpg|png|webp)$/i.test(key)) return new Response("Imagem inválida.", { status: 400 });
    const object = await (await getBucket()).get(key);
    if (!object) return new Response("Imagem não encontrada.", { status: 404 });
    const headers = new Headers({ "Cache-Control": "public, max-age=31536000, immutable" });
    object.writeHttpMetadata(headers);
    if (object.httpEtag) headers.set("ETag", object.httpEtag);
    return new Response(object.body, { headers });
  } catch {
    return new Response("Não foi possível carregar a imagem.", { status: 500 });
  }
}
