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
  assert.match(html, /Ideias que/);
  assert.match(html, /movem/);
  assert.match(html, /Conheça o ecossistema/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape/i);
});

test("mantém todas as áreas principais acessíveis", async () => {
  const routes = [
    ["/loja", /Vista a ideia/],
    ["/blog", /Pensamento/],
    ["/palestras", /Ideias que/],
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

