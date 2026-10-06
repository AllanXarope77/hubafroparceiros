import { put } from "@vercel/blob";

const acceptedTypes = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return Response.json({ error: "Selecione uma imagem." }, { status: 400 });
    const extension = acceptedTypes.get(file.type);
    if (!extension) return Response.json({ error: "Use uma imagem JPG, PNG ou WebP." }, { status: 400 });
    if (file.size > 4 * 1024 * 1024) return Response.json({ error: "A imagem deve ter no máximo 4 MB." }, { status: 400 });

    const key = `product-color-${crypto.randomUUID()}.${extension}`;
    const blob = await put(`products/${key}`, file, {
      access: "public",
      addRandomSuffix: false,
      contentType: file.type,
    });
    return Response.json({ url: blob.url }, { status: 201 });
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Não foi possível enviar a imagem." }, { status: 500 });
  }
}
