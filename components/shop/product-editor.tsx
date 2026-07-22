"use client";

import { ArrowLeft, CheckCircle2, ExternalLink, ImageIcon, Package, Save, Tags, Trash2 } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { formatPrice, type SavedProduct } from "@/lib/products";

const emptyPreview = { name: "Nome do produto", price: "R$ 0,00" };
const availableSizes = ["PP", "P", "M", "G", "GG", "XG", "EXG", "X1", "X2", "X3", "Único"];
const availableColors = ["Preto", "Branco", "Vermelho", "Amarelo", "Rosa", "Verde", "Azul", "Marrom"];
const availableExtraCategories = [
  ["masculino", "Masculino"], ["feminino", "Feminino"], ["bone", "Boné"],
  ["camisa", "Camisa"], ["moletom", "Moletom"], ["livro", "Livro"],
];

export function ProductEditor() {
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [previewName, setPreviewName] = useState(emptyPreview.name);
  const [previewPrice, setPreviewPrice] = useState(emptyPreview.price);

  useEffect(() => {
    fetch("/api/products", { cache: "no-store" })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Não foi possível carregar os produtos.");
        setProducts(data.products ?? []);
      })
      .catch(reason => setError(reason instanceof Error ? reason.message : "Não foi possível carregar os produtos."))
      .finally(() => setLoading(false));
  }, []);

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const price = Number(String(values.get("price") || "0").replace(",", "."));
    const customColors = String(values.get("customColors") || "").split(",").map(color => color.trim()).filter(Boolean);
    const payload = {
      name: values.get("name"),
      description: values.get("description"),
      priceCents: Math.round(price * 100),
      stock: Number(values.get("stock") || 0),
      image: values.get("image"),
      officialUrl: values.get("officialUrl"),
      productType: values.get("productType"),
      audience: values.get("audience"),
      sizes: values.getAll("sizes"),
      colors: [...new Set([...values.getAll("colors").map(String), ...customColors])],
      extraCategories: values.getAll("extraCategories"),
      status: values.get("status"),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível cadastrar o produto.");
      setProducts(current => [data.product, ...current]);
      setMessage(`“${data.product.name}” foi cadastrado com sucesso.`);
      form.reset();
      setImage("");
      setPreviewName(emptyPreview.name);
      setPreviewPrice(emptyPreview.price);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível cadastrar o produto.");
    } finally {
      setSaving(false);
    }
  }

  async function deleteProduct(product: SavedProduct) {
    if (!window.confirm(`Excluir definitivamente “${product.name}”?`)) return;
    setDeleting(product.id);
    setError("");
    try {
      const response = await fetch(`/api/products?id=${product.id}`, { method: "DELETE" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível excluir o produto.");
      setProducts(current => current.filter(item => item.id !== product.id));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível excluir o produto.");
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="product-editor-shell">
      <header className="product-editor-topbar">
        <div><Link href="/loja"><ArrowLeft size={17} /> Voltar para a loja</Link><strong>DNA Guetos</strong><span>Cadastro de produtos</span></div>
        <Link href="/loja" className="editor-store-link">Ver vitrine <ExternalLink size={15} /></Link>
      </header>
      <div className="product-editor-layout">
        <aside className="product-editor-sidebar">
          <span>Catálogo</span>
          <a href="#informacoes" className="active"><Package size={17} />Informações</a>
          <a href="#variacoes"><span className="editor-sidebar-symbol">V</span>Variações</a>
          <a href="#midia"><ImageIcon size={17} />Imagem</a>
          <a href="#organizacao"><Tags size={17} />Organização</a>
          <a href="#cadastrados"><CheckCircle2 size={17} />Cadastrados</a>
        </aside>
        <main className="product-editor-main">
          <div className="product-editor-heading"><div><small>Catálogo / Novo produto</small><h1>Cadastrar produto</h1><p>Preencha as informações que serão exibidas na vitrine DNA Guetos.</p></div><span className="editor-draft-badge">Novo cadastro</span></div>
          <form className="product-editor-form" onSubmit={createProduct}>
            <div className="product-editor-fields">
              <section className="editor-panel" id="informacoes">
                <div className="editor-panel-title"><span>01</span><div><h2>Informações principais</h2><p>Identificação e descrição comercial.</p></div></div>
                <label>Nome do produto <input name="name" maxLength={140} placeholder="Ex.: Camisa DNA Guetos" required onChange={event => setPreviewName(event.target.value || emptyPreview.name)} /></label>
                <label>Descrição <textarea name="description" rows={5} maxLength={1200} placeholder="Conte a história, os materiais e os diferenciais do produto." /></label>
              </section>
              <section className="editor-panel">
                <div className="editor-panel-title"><span>02</span><div><h2>Preço e estoque</h2><p>Dados usados no card e no carrinho.</p></div></div>
                <div className="editor-field-grid"><label>Preço no Pix (R$)<input name="price" inputMode="decimal" placeholder="150,00" required onChange={event => { const value = Number(event.target.value.replace(",", ".")); setPreviewPrice(Number.isFinite(value) ? formatPrice(Math.round(value * 100)) : emptyPreview.price); }} /></label><label>Estoque<input name="stock" type="number" min="0" step="1" defaultValue="0" required /></label></div>
              </section>
              <section className="editor-panel" id="variacoes">
                <div className="editor-panel-title"><span>03</span><div><h2>Variações</h2><p>Selecione os tamanhos, cores e categorias disponíveis.</p></div></div>
                <fieldset className="editor-choice-fieldset"><legend>Tamanhos</legend><div className="editor-choice-grid editor-choice-grid--sizes">{availableSizes.map(size => <label className="editor-choice" key={size}><input type="checkbox" name="sizes" value={size} /><span>{size}</span></label>)}</div></fieldset>
                <fieldset className="editor-choice-fieldset"><legend>Cores</legend><div className="editor-choice-grid">{availableColors.map(color => <label className="editor-choice" key={color}><input type="checkbox" name="colors" value={color} /><span>{color}</span></label>)}</div><label className="editor-custom-colors">Outras cores<input name="customColors" placeholder="Ex.: Laranja, Vinho, Bege" /><small>Separe várias cores com vírgulas.</small></label></fieldset>
                <fieldset className="editor-choice-fieldset"><legend>Categorias adicionais</legend><p>Use quando o mesmo produto precisar aparecer em mais de um filtro.</p><div className="editor-choice-grid">{availableExtraCategories.map(([value, label]) => <label className="editor-choice" key={value}><input type="checkbox" name="extraCategories" value={value} /><span>{label}</span></label>)}</div></fieldset>
              </section>
              <section className="editor-panel" id="midia">
                <div className="editor-panel-title"><span>04</span><div><h2>Imagem do produto</h2><p>Cole o endereço da imagem hospedada.</p></div></div>
                <label>URL da imagem <input name="image" type="url" placeholder="https://.../produto.png" required value={image} onChange={event => setImage(event.target.value)} /></label>
                <p className="editor-field-hint">Prefira imagens quadradas ou verticais, com fundo limpo e boa resolução.</p>
              </section>
              <section className="editor-panel" id="organizacao">
                <div className="editor-panel-title"><span>05</span><div><h2>Organização e publicação</h2><p>Defina onde o produto aparecerá.</p></div></div>
                <div className="editor-field-grid"><label>Tipo<select name="productType" defaultValue="camisa"><option value="camisa">Camisa</option><option value="bone">Boné</option><option value="moletom">Moletom</option><option value="livro">Livro</option></select></label><label>Público<select name="audience" defaultValue="unissex"><option value="unissex">Unissex</option><option value="masculino">Masculino</option><option value="feminino">Feminino</option><option value="infantil">Infantil</option></select></label></div>
                <div className="editor-field-grid"><label>Status<select name="status" defaultValue="active"><option value="active">Ativo na vitrine</option><option value="draft">Rascunho</option></select></label><label>Link oficial da Yampi <input name="officialUrl" type="url" placeholder="https://www.afroparceiros.com/..." required /></label></div>
              </section>
              {error && <p className="editor-product-message error">{error}</p>}
              {message && <p className="editor-product-message success"><CheckCircle2 size={17} />{message}</p>}
              <div className="product-editor-submit"><button type="submit" disabled={saving}><Save size={17} />{saving ? "Salvando produto..." : "Cadastrar produto"}</button></div>
            </div>
            <aside className="product-editor-preview">
              <span>Prévia na vitrine</span>
              <div className="editor-preview-card">
                <div className="editor-preview-image">{image ? <img src={image} alt="Prévia do produto" /> : <ImageIcon size={34} />}</div>
                <small>Novo produto</small><h3>{previewName}</h3><strong>{previewPrice}</strong><p>Preço no Pix</p>
              </div>
            </aside>
          </form>
          <section className="editor-products-panel" id="cadastrados">
            <div className="editor-products-heading"><div><small>Gerenciar catálogo</small><h2>Produtos cadastrados</h2></div><strong>{products.length}</strong></div>
            {loading && <p className="editor-products-state">Carregando produtos...</p>}
            {!loading && !products.length && <p className="editor-products-state">Nenhum produto cadastrado por este editor ainda.</p>}
            {!!products.length && <div className="editor-products-list">{products.map(product => (
              <article key={product.id}><img src={product.image} alt="" /><div><small>{product.productType} · {product.status === "active" ? "Ativo" : "Rascunho"}</small><h3>{product.name}</h3><p>{formatPrice(product.priceCents)} · {product.stock} em estoque · {(product.sizes?.length ?? 0) + (product.colors?.length ?? 0)} variações</p></div><div className="editor-product-actions">{product.status === "active" && <Link href={`/loja/custom-${product.id}`}>Visualizar</Link>}<button type="button" onClick={() => deleteProduct(product)} disabled={deleting === product.id}><Trash2 size={15} />{deleting === product.id ? "Excluindo" : "Excluir"}</button></div></article>
            ))}</div>}
          </section>
        </main>
      </div>
    </div>
  );
}
