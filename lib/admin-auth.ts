import { createHash, timingSafeEqual } from "node:crypto";

const adminHeader = "x-admin-key";

function normalizeHash(value: string) {
  return value.trim().toLowerCase();
}

export function adminAuthResponse(request: Request) {
  const expectedHash = normalizeHash(process.env.ADMIN_EDITOR_KEY_HASH ?? "");
  if (!/^[a-f0-9]{64}$/.test(expectedHash)) {
    return Response.json(
      { error: "A chave administrativa ainda não foi configurada no servidor." },
      { status: 503 },
    );
  }

  const submittedKey = request.headers.get(adminHeader) ?? "";
  if (!submittedKey) {
    return Response.json({ error: "Informe a chave administrativa do editor." }, { status: 401 });
  }

  const submittedHash = createHash("sha256").update(submittedKey, "utf8").digest();
  const expected = Buffer.from(expectedHash, "hex");
  if (submittedHash.length !== expected.length || !timingSafeEqual(submittedHash, expected)) {
    return Response.json({ error: "Chave administrativa inválida." }, { status: 401 });
  }

  return null;
}

