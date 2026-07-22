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
    ["/loja", /Vista identidade/],
    ["/loja/editar", /Cadastrar produto/],
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

test("oferece gerenciamento dos posts no editor", async () => {
  const response = await render("/blog/editar");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Posts publicados/);
});

test("exibe os produtos reais da DNA Guetos", async () => {
  const response = await render("/loja");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Boné DNA GUETOS/);
  assert.match(html, /Camisa Thug Life/);
  assert.match(html, /camisa-dna-guetos\.png/);
  assert.match(html, /\/loja\/43721859/);
  assert.doesNotMatch(html, /Loja demonstrativa|Camiseta Centro/);
});

test("oferece filtros, páginas de produto e carrinho", async () => {
  const shopResponse = await render("/loja");
  const shopHtml = await shopResponse.text();
  assert.match(shopHtml, /Masculino/);
  assert.match(shopHtml, /Feminino/);
  assert.match(shopHtml, /Moletom/);
  assert.match(shopHtml, /Livro Guetos - Apartheid Urbano/);

  const productResponse = await render("/loja/43721859");
  assert.equal(productResponse.status, 200);
  const productHtml = await productResponse.text();
  assert.match(productHtml, /Camisa DNA GUETOS/);
  assert.match(productHtml, /Adicionar ao carrinho/);
  assert.match(productHtml, /Escolher tamanho e cor na loja oficial/);

  const cartResponse = await render("/carrinho");
  assert.equal(cartResponse.status, 200);
  assert.match(await cartResponse.text(), /Seu carrinho está vazio/);
});

test("mantém o editor de produtos oculto e acessível pelo caminho direto", async () => {
  const editorResponse = await render("/loja/editar");
  assert.equal(editorResponse.status, 200);
  const editorHtml = await editorResponse.text();
  assert.match(editorHtml, /Informações principais/);
  assert.match(editorHtml, /Preço e estoque/);
  assert.match(editorHtml, /Variações/);
  assert.match(editorHtml, /Tamanhos/);
  assert.match(editorHtml, /Categorias adicionais/);
  assert.match(editorHtml, /Produtos cadastrados/);

  const shopResponse = await render("/loja");
  assert.doesNotMatch(await shopResponse.text(), /\/loja\/editar/);
});

test("mantém o editor oculto na página pública do Blog", async () => {
  const response = await render("/blog");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.doesNotMatch(html, /Editar blog|\/blog\/editar/i);
  assert.doesNotMatch(html, /MANIFESTO DO AGORA|O futuro também se escreve|Assuntos/i);
});
