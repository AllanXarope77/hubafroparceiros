import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renderiza a home com a identidade do Hub Afro", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Hub Afro/i);
  assert.match(html, /HUB Afroparceiros/);
  assert.match(html, /resistência não é moda/i);
  assert.match(html, /banner-principal\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("mantém todas as áreas principais acessíveis", async () => {
  const routes = [
    ["/loja", /Vista a ideia/],
    ["/blog", /Pensamento/],
    ["/blog/editar", /Transforme ideias/],
    ["/palestras", /Transforme a cultura/],
    ["/clube-do-livro", /Ler junto muda/],
    ["/podcast", /Vozes que/],
    ["/contato", /Toda parceria começa/],
  ];

  for (const [pathname, expectedText] of routes) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    assert.match(await response.text(), expectedText, pathname);
  }
});

test("mantém o editor oculto na página pública do Blog", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /Editar blog|\/blog\/editar/i);
  assert.doesNotMatch(html, /MANIFESTO DO AGORA|O futuro também se escreve|Assuntos/i);
});
