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

test("renderiza a home com a identidade da AFROPARCEIROS", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /AFROPARCEIROS/i);
  assert.match(html, /Cultura que movimenta/i);
  assert.match(html, /Conexões que geram negócios/i);
  assert.match(html, /banner-principal\.png/);
  assert.doesNotMatch(html, /Marina Costa|Rafael Nascimento|500\+|40 mil/i);
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
    ["/contato", /Vamos construir/],
    ["/solucoes", /Soluções B2B/],
    ["/experiencias", /Experiências AFROPARCEIROS/],
    ["/projetos", /Banco de Projetos/],
    ["/projetos/feijhoada", /Feijhôada/],
    ["/artistas", /Talentos que criam/],
    ["/pessoas/sergio-carvalho", /Sergio/],
    ["/conteudo", /Blog AFROPARCEIROS/],
    ["/livro-guetos", /O Apartheid Urbano/],
    ["/sobre", /Muito além/],
    ["/instituto-afroparceiros", /Instituto Afroparceiros/],
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

test("carrega o catálogo editável da DNA Guetos", async () => {
  const response = await render("/loja");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Carregando catálogo/);
  assert.match(html, /Buscar produto/);
  assert.doesNotMatch(html, /Camisa Thug Life/);
  assert.doesNotMatch(html, /Loja demonstrativa|Camiseta Centro/);
});

test("oferece português, inglês e espanhol nas páginas públicas", async () => {
  const response = await render("/loja");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Idioma do site/);
  assert.match(html, /Português/);
  assert.match(html, /English/);
  assert.match(html, /Español/);
});

test("oferece filtros, páginas de produto e carrinho", async () => {
  const shopResponse = await render("/loja");
  const shopHtml = await shopResponse.text();
  assert.match(shopHtml, /Masculino/);
  assert.match(shopHtml, /Feminino/);
  assert.match(shopHtml, /Moletom/);
  assert.match(shopHtml, /Carregando catálogo/);

  const productResponse = await render("/loja/43721859");
  assert.equal(productResponse.status, 200);
  const productHtml = await productResponse.text();
  assert.match(productHtml, /Carregando produto/);

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
  assert.match(editorHtml, /Selecionar tudo/);
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
