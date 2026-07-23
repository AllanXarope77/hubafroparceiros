const acceptedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

async function getBucket() {
  const { env } = await import("cloudflare:workers");
  const bucket = (env as unknown as { PRODUCT_IMAGES?: R2Bucket }).PRODUCT_IMAGES;
  if (!bucket) throw new Error("O armazenamento de imagens não está disponível.");
  return bucket;
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "Selecione uma imagem." }, { status: 400 });
    const extension = acceptedTypes.get(file.type);
    if (!extension) return Response.json({ error: "Use uma imagem JPG, PNG ou WebP." }, { status: 400 });
    if (file.size > 5 * 1024 * 1024) return Response.json({ error: "A imagem deve ter no máximo 5 MB." }, { status: 400 });

    const key = `product-color-${crypto.randomUUID()}.${extension}`;
    const bucket = await getBucket();
    await bucket.put(key, await file.arrayBuffer(), { httpMetadata: { contentType: file.type } });
    return Response.json({ url: `/api/product-images/${key}` }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." }, { status: 500 });
  }
}
