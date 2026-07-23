"use client";

import { ArrowLeft, CheckCircle2, Download, ExternalLink, ImageIcon, Package, Pencil, Save, Tags, Trash2, UploadCloud } from "lucide-react";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { emptyProductCatalogData, formatPrice, type CatalogVariant, type ProductCatalogData, type SavedProduct } from "@/lib/products";

const emptyPreview = { name: "Nome do produto", price: "R$ 0,00" };
const availableSizes = ["PP", "P", "M", "G", "GG", "XG", "EXG", "X1", "X2", "X3", "Único"];
const availableColors = ["Preto", "Branco", "Vermelho", "Amarelo", "Rosa", "Verde", "Azul", "Marrom"];
const availableExtraCategories = [
  ["masculino", "Masculino"], ["feminino", "Feminino"], ["bone", "Boné"],
  ["camisa", "Camisa"], ["moletom", "Moletom"], ["livro", "Livro"],
];

function variantKey(size: string, color: string) {
  return `${size || "unico"}::${color || "padrao"}`;
}

function skuPart(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]+/g, "-").replace(/^-|-$/g, "").toUpperCase();
}

function catalogData(product?: SavedProduct): ProductCatalogData {
  return { ...emptyProductCatalogData, ...(product?.catalogData ?? {}), variants: product?.catalogData?.variants ?? [] };
}

function csvCell(value: unknown) {
  const text = String(value ?? "").replace(/\r?\n/g, " ");
  return `"${text.replace(/"/g, '""')}"`;
}

export function ProductEditor() {
  const formRef = useRef<HTMLFormElement>(null);
  const [products, setProducts] = useState<SavedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState("");
  const [previewName, setPreviewName] = useState(emptyPreview.name);
  const [previewPrice, setPreviewPrice] = useState(emptyPreview.price);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [customColors, setCustomColors] = useState("");
  const [colorImages, setColorImages] = useState<Record<string, string>>({});
  const [uploadingColor, setUploadingColor] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [baseSku, setBaseSku] = useState("");
  const [variantRows, setVariantRows] = useState<CatalogVariant[]>([]);
  const [csvScope, setCsvScope] = useState<"active" | "all">("active");
  const customColorList = customColors.split(",").map(color => color.trim()).filter(Boolean);
  const allSelectedColors = [...new Set([...selectedColors, ...customColorList])];
  const variantCombinations = (selectedSizes.length ? selectedSizes : [""]).flatMap(size =>
    (allSelectedColors.length ? allSelectedColors : [""]).map(color => ({ size, color, key: variantKey(size, color) })),
  );

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

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const form = event.currentTarget;
    const values = new FormData(form);
    const price = Number(String(values.get("price") || "0").replace(",", "."));
    const productStock = Number(values.get("stock") || 0);
    const submittedBaseSku = String(values.get("baseSku") || "").trim();
    const payload = {
      id: editingId,
      name: values.get("name"),
      description: values.get("description"),
      priceCents: Math.round(price * 100),
      stock: productStock,
      image: values.get("image"),
      officialUrl: "",
      productType: values.get("productType"),
      audience: values.get("audience"),
      sizes: selectedSizes,
      colors: allSelectedColors,
      extraCategories: selectedCategories,
      colorImages: allSelectedColors.flatMap(color => colorImages[color] ? [{ color, image: colorImages[color] }] : []),
      catalogData: {
        brand: values.get("brand"),
        baseSku: submittedBaseSku,
        barcode: values.get("barcode"),
        material: values.get("material"),
        condition: values.get("condition"),
        weightGrams: Number(values.get("weightGrams") || 0),
        lengthCm: Number(values.get("lengthCm") || 0),
        widthCm: Number(values.get("widthCm") || 0),
        heightCm: Number(values.get("heightCm") || 0),
        variants: variantCombinations.map(combination => {
          const saved = variantRows.find(row => row.key === combination.key);
          const generatedSku = [submittedBaseSku, combination.color, combination.size].filter(Boolean).map(skuPart).join("-");
          return {
            ...combination,
            sku: saved?.sku.trim() || generatedSku,
            barcode: saved?.barcode.trim() || "",
            stock: saved?.stock ?? (variantCombinations.length === 1 ? productStock : 0),
          };
        }),
      },
      status: values.get("status"),
    };

    try {
      const response = await fetch("/api/products", {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível cadastrar o produto.");
      setProducts(current => editingId
        ? current.map(item => item.id === editingId ? data.product : item)
        : [data.product, ...current]);
      setMessage(editingId ? `“${data.product.name}” foi atualizado com sucesso.` : `“${data.product.name}” foi cadastrado com sucesso.`);
      form.reset();
      setEditingId(null);
      setImage("");
      setPreviewName(emptyPreview.name);
      setPreviewPrice(emptyPreview.price);
      setSelectedSizes([]);
      setSelectedColors([]);
      setSelectedCategories([]);
      setCustomColors("");
      setColorImages({});
      setBaseSku("");
      setVariantRows([]);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível cadastrar o produto.");
    } finally {
      setSaving(false);
    }
  }

  function toggleValue(value: string, selected: string[], update: (values: string[]) => void) {
    update(selected.includes(value) ? selected.filter(item => item !== value) : [...selected, value]);
  }

  function editProduct(product: SavedProduct) {
    const form = formRef.current;
    if (!form) return;
    const setField = (name: string, value: string) => {
      const field = form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null;
      if (field) field.value = value;
    };
    setField("name", product.name);
    setField("description", product.description ?? "");
    setField("price", (product.priceCents / 100).toFixed(2).replace(".", ","));
    setField("stock", String(product.stock));
    setField("productType", product.productType);
    setField("audience", product.audience);
    setField("status", product.status);
    const channelData = catalogData(product);
    setField("brand", channelData.brand);
    setField("baseSku", channelData.baseSku);
    setField("barcode", channelData.barcode);
    setField("material", channelData.material);
    setField("condition", channelData.condition);
    setField("weightGrams", String(channelData.weightGrams || ""));
    setField("lengthCm", String(channelData.lengthCm || ""));
    setField("widthCm", String(channelData.widthCm || ""));
    setField("heightCm", String(channelData.heightCm || ""));
    setEditingId(product.id);
    setImage(product.image);
    setPreviewName(product.name);
    setPreviewPrice(formatPrice(product.priceCents));
    setSelectedSizes(product.sizes ?? []);
    setSelectedColors((product.colors ?? []).filter(color => availableColors.includes(color)));
    setCustomColors((product.colors ?? []).filter(color => !availableColors.includes(color)).join(", "));
    setSelectedCategories(product.extraCategories ?? []);
    setColorImages(Object.fromEntries((product.colorImages ?? []).map(item => [item.color, item.image])));
    setBaseSku(channelData.baseSku);
    setVariantRows(channelData.variants);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEditing() {
    formRef.current?.reset();
    setEditingId(null);
    setImage("");
    setPreviewName(emptyPreview.name);
    setPreviewPrice(emptyPreview.price);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    setCustomColors("");
    setColorImages({});
    setBaseSku("");
    setVariantRows([]);
    setMessage("");
    setError("");
  }

  async function uploadColorImage(color: string, file?: File) {
    if (!file) return;
    setUploadingColor(color);
    setError("");
    const body = new FormData();
    body.set("file", file);
    try {
      const response = await fetch("/api/product-images", { method: "POST", body });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível anexar a imagem.");
      setColorImages(current => ({ ...current, [color]: data.url }));
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Não foi possível anexar a imagem.");
    } finally {
      setUploadingColor("");
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

  function updateVariant(combination: { key: string; size: string; color: string }, field: "sku" | "barcode" | "stock", value: string) {
    setVariantRows(current => {
      const existing = current.find(row => row.key === combination.key) ?? {
        ...combination,
        sku: "",
        barcode: "",
        stock: 0,
      };
      const next = { ...existing, [field]: field === "stock" ? Math.max(0, Number(value) || 0) : value };
      return [...current.filter(row => row.key !== combination.key), next];
    });
  }

  function downloadCatalogCsv() {
    const selectedProducts = products.filter(product => csvScope === "all" || product.status === "active");
    if (!selectedProducts.length) {
      setError("Não há produtos no escopo escolhido para exportar.");
      return;
    }

    const headers = [
      "product_id", "variant_key", "sku", "gtin_ean", "name", "description", "brand", "product_type",
      "audience", "condition", "material", "currency", "price", "total_stock", "variant_stock", "size", "color",
      "main_image", "variant_image", "categories", "weight_g", "length_cm", "width_cm", "height_cm", "status", "product_url",
    ];
    const rows = selectedProducts.flatMap(product => {
      const channelData = catalogData(product);
      const sizes = product.sizes?.length ? product.sizes : [""];
      const colors = product.colors?.length ? product.colors : [""];
      const combinations = sizes.flatMap(size => colors.map(color => ({ size, color, key: variantKey(size, color) })));
      return combinations.map((combination, index) => {
        const configured = channelData.variants.find(row => row.key === combination.key);
        const sku = configured?.sku || [channelData.baseSku, combination.color, combination.size].filter(Boolean).map(skuPart).join("-");
        const mainImage = product.image.startsWith("/") ? `${window.location.origin}${product.image}` : product.image;
        const colorImageValue = product.colorImages?.find(item => item.color === combination.color)?.image ?? "";
        const variantImage = colorImageValue.startsWith("/") ? `${window.location.origin}${colorImageValue}` : colorImageValue;
        const variantStock = configured ? configured.stock : combinations.length === 1 ? product.stock : "";
        return [
          product.id, combination.key, sku, configured?.barcode || (index === 0 ? channelData.barcode : ""), product.name,
          product.description, channelData.brand, product.productType, product.audience, channelData.condition, channelData.material,
          "BRL", (product.priceCents / 100).toFixed(2), product.stock, variantStock, combination.size, combination.color,
          mainImage, variantImage, product.extraCategories?.join("|") ?? "", channelData.weightGrams || "", channelData.lengthCm || "",
          channelData.widthCm || "", channelData.heightCm || "", product.status, `${window.location.origin}/loja/${product.id}`,
        ];
      });
    });
    const csv = `\uFEFF${[headers, ...rows].map(row => row.map(csvCell).join(";")).join("\r\n")}`;
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `catalogo-dna-guetos-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
    setMessage(`${selectedProducts.length} produto(s) exportado(s). O CSV mestre inclui uma linha para cada variação.`);
    setError("");
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
          <a href="#canais"><Download size={17} />Catálogo CSV</a>
          <a href="#cadastrados"><CheckCircle2 size={17} />Cadastrados</a>
        </aside>
        <main className="product-editor-main">
          <div className="product-editor-heading"><div><small>Catálogo / {editingId ? "Editar produto" : "Novo produto"}</small><h1>{editingId ? "Editar produto" : "Cadastrar produto"}</h1><p>Cadastre uma vez e mantenha os dados preparados para a vitrine e para outros canais de venda.</p></div><span className="editor-draft-badge">{editingId ? "Em edição" : "Novo cadastro"}</span></div>
          <form ref={formRef} className="product-editor-form" onSubmit={saveProduct}>
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
                <fieldset className="editor-choice-fieldset"><div className="editor-choice-heading"><legend>Tamanhos</legend><button type="button" onClick={() => setSelectedSizes(selectedSizes.length === availableSizes.length ? [] : availableSizes)}>{selectedSizes.length === availableSizes.length ? "Desmarcar tudo" : "Selecionar tudo"}</button></div><div className="editor-choice-grid editor-choice-grid--sizes">{availableSizes.map(size => <label className="editor-choice" key={size}><input type="checkbox" name="sizes" value={size} checked={selectedSizes.includes(size)} onChange={() => toggleValue(size, selectedSizes, setSelectedSizes)} /><span>{size}</span></label>)}</div></fieldset>
                <fieldset className="editor-choice-fieldset"><div className="editor-choice-heading"><legend>Cores</legend><button type="button" onClick={() => setSelectedColors(selectedColors.length === availableColors.length ? [] : availableColors)}>{selectedColors.length === availableColors.length ? "Desmarcar tudo" : "Selecionar tudo"}</button></div><div className="editor-choice-grid">{availableColors.map(color => <label className="editor-choice" key={color}><input type="checkbox" name="colors" value={color} checked={selectedColors.includes(color)} onChange={() => toggleValue(color, selectedColors, setSelectedColors)} /><span>{color}</span></label>)}</div><label className="editor-custom-colors">Outras cores<input name="customColors" placeholder="Ex.: Laranja, Vinho, Bege" value={customColors} onChange={event => setCustomColors(event.target.value)} /><small>Separe várias cores com vírgulas.</small></label>{!!allSelectedColors.length && <div className="editor-color-images"><div><strong>Imagens por cor</strong><span>Anexe uma imagem específica para cada cor selecionada.</span></div>{allSelectedColors.map(color => <div className="editor-color-image-row" key={color}><div className="editor-color-image-preview">{colorImages[color] ? <img src={colorImages[color]} alt={`Produto na cor ${color}`} /> : <ImageIcon size={19} />}</div><strong>{color}</strong><label className="editor-upload-button"><UploadCloud size={15} />{uploadingColor === color ? "Enviando..." : colorImages[color] ? "Trocar imagem" : "Anexar imagem"}<input type="file" accept="image/jpeg,image/png,image/webp" disabled={!!uploadingColor} onChange={event => uploadColorImage(color, event.target.files?.[0])} /></label>{colorImages[color] && <span className="editor-uploaded-status"><CheckCircle2 size={14} />Anexada</span>}</div>)}</div>}</fieldset>
                <fieldset className="editor-choice-fieldset"><div className="editor-choice-heading"><legend>Categorias adicionais</legend><button type="button" onClick={() => setSelectedCategories(selectedCategories.length === availableExtraCategories.length ? [] : availableExtraCategories.map(([value]) => value))}>{selectedCategories.length === availableExtraCategories.length ? "Desmarcar tudo" : "Selecionar tudo"}</button></div><p>Use quando o mesmo produto precisar aparecer em mais de um filtro.</p><div className="editor-choice-grid">{availableExtraCategories.map(([value, label]) => <label className="editor-choice" key={value}><input type="checkbox" name="extraCategories" value={value} checked={selectedCategories.includes(value)} onChange={() => toggleValue(value, selectedCategories, setSelectedCategories)} /><span>{label}</span></label>)}</div></fieldset>
                <div className="editor-variant-matrix">
                  <div className="editor-variant-matrix-heading"><div><strong>SKUs e estoque por variação</strong><span>Cada combinação será uma linha independente no CSV.</span></div><small>{variantCombinations.length} combinação(ões)</small></div>
                  <div className="editor-variant-table" role="table" aria-label="Dados das variações">
                    <div className="editor-variant-row editor-variant-row--head" role="row"><span>Variação</span><span>SKU</span><span>GTIN/EAN</span><span>Estoque</span></div>
                    {variantCombinations.map(combination => {
                      const configured = variantRows.find(row => row.key === combination.key);
                      const generatedSku = [baseSku, combination.color, combination.size].filter(Boolean).map(skuPart).join("-");
                      const label = [combination.color, combination.size].filter(Boolean).join(" · ") || "Produto único";
                      return <div className="editor-variant-row" role="row" key={combination.key}>
                        <strong>{label}</strong>
                        <input aria-label={`SKU de ${label}`} value={configured?.sku ?? ""} placeholder={generatedSku || "SKU-VARIACAO"} onChange={event => updateVariant(combination, "sku", event.target.value)} />
                        <input aria-label={`GTIN ou EAN de ${label}`} value={configured?.barcode ?? ""} inputMode="numeric" placeholder="Opcional" onChange={event => updateVariant(combination, "barcode", event.target.value)} />
                        <input aria-label={`Estoque de ${label}`} value={configured?.stock ?? (variantCombinations.length === 1 ? "" : 0)} type="number" min="0" step="1" placeholder={variantCombinations.length === 1 ? "Estoque total" : "0"} onChange={event => updateVariant(combination, "stock", event.target.value)} />
                      </div>;
                    })}
                  </div>
                </div>
              </section>
              <section className="editor-panel" id="midia">
                <div className="editor-panel-title"><span>04</span><div><h2>Imagem do produto</h2><p>Cole o endereço da imagem hospedada.</p></div></div>
                <label>URL da imagem <input name="image" type="text" placeholder="https://.../produto.png" required value={image} onChange={event => setImage(event.target.value)} /></label>
                <p className="editor-field-hint">Prefira imagens quadradas ou verticais, com fundo limpo e boa resolução.</p>
              </section>
              <section className="editor-panel" id="organizacao">
                <div className="editor-panel-title"><span>05</span><div><h2>Organização e publicação</h2><p>Defina onde o produto aparecerá.</p></div></div>
                <div className="editor-field-grid"><label>Tipo<select name="productType" defaultValue="camisa"><option value="camisa">Camisa</option><option value="bone">Boné</option><option value="moletom">Moletom</option><option value="livro">Livro</option></select></label><label>Público<select name="audience" defaultValue="unissex"><option value="unissex">Unissex</option><option value="masculino">Masculino</option><option value="feminino">Feminino</option><option value="infantil">Infantil</option></select></label></div>
                <label>Status<select name="status" defaultValue="active"><option value="active">Ativo na vitrine</option><option value="draft">Rascunho</option></select></label>
              </section>
              <section className="editor-panel" id="canais">
                <div className="editor-panel-title"><span>06</span><div><h2>Dados para canais de venda</h2><p>Informações padronizadas para Mercado Livre, SHEIN e outros e-commerces.</p></div></div>
                <div className="editor-field-grid"><label>Marca<input name="brand" maxLength={80} defaultValue="DNA Guetos" placeholder="DNA Guetos" /></label><label>SKU base<input name="baseSku" maxLength={80} value={baseSku} placeholder="Ex.: CAM-DNA-001" onChange={event => setBaseSku(event.target.value)} /></label></div>
                <div className="editor-field-grid"><label>GTIN/EAN do produto<input name="barcode" inputMode="numeric" maxLength={40} placeholder="Opcional" /></label><label>Condição<select name="condition" defaultValue="new"><option value="new">Novo</option><option value="used">Usado</option></select></label></div>
                <label>Material principal<input name="material" maxLength={120} placeholder="Ex.: Algodão 100%" /></label>
                <div className="editor-field-grid editor-field-grid--four"><label>Peso (g)<input name="weightGrams" type="number" min="0" step="1" placeholder="0" /></label><label>Comprimento (cm)<input name="lengthCm" type="number" min="0" step="1" placeholder="0" /></label><label>Largura (cm)<input name="widthCm" type="number" min="0" step="1" placeholder="0" /></label><label>Altura (cm)<input name="heightCm" type="number" min="0" step="1" placeholder="0" /></label></div>
                <p className="editor-field-hint">O SKU identifica o produto no estoque. O GTIN/EAN é o código de barras oficial, quando existir.</p>
              </section>
              {error && <p className="editor-product-message error">{error}</p>}
              {message && <p className="editor-product-message success"><CheckCircle2 size={17} />{message}</p>}
              <div className="product-editor-submit">{editingId && <button className="editor-cancel" type="button" onClick={cancelEditing}>Cancelar edição</button>}<button type="submit" disabled={saving}><Save size={17} />{saving ? "Salvando produto..." : editingId ? "Salvar alterações" : "Cadastrar produto"}</button></div>
            </div>
            <aside className="product-editor-preview">
              <span>Prévia na vitrine</span>
              <div className="editor-preview-card">
                <div className="editor-preview-image">{image ? <img src={image} alt="Prévia do produto" /> : <ImageIcon size={34} />}</div>
                <small>Novo produto</small><h3>{previewName}</h3><strong>{previewPrice}</strong><p>Preço no Pix</p>
              </div>
            </aside>
          </form>
          <section className="editor-export-panel" id="exportar">
            <div><small>Catálogo multicanal</small><h2>Exportar CSV mestre</h2><p>Gera um arquivo UTF-8 com produtos, atributos, imagens, medidas e uma linha para cada variação. Esse arquivo serve como base para adaptar às planilhas de cada marketplace.</p></div>
            <div className="editor-export-actions"><label>Produtos<select value={csvScope} onChange={event => setCsvScope(event.target.value as "active" | "all")}><option value="active">Somente ativos</option><option value="all">Ativos e rascunhos</option></select></label><button type="button" onClick={downloadCatalogCsv} disabled={loading || !products.length}><Download size={17} />Baixar catálogo CSV</button></div>
          </section>
          <section className="editor-products-panel" id="cadastrados">
            <div className="editor-products-heading"><div><small>Gerenciar catálogo</small><h2>Produtos cadastrados</h2></div><strong>{products.length}</strong></div>
            {loading && <p className="editor-products-state">Carregando produtos...</p>}
            {!loading && !products.length && <p className="editor-products-state">Nenhum produto cadastrado por este editor ainda.</p>}
            {!!products.length && <div className="editor-products-list">{products.map(product => (
              <article key={product.id}><img src={product.image} alt="" /><div><small>{product.productType} · {product.status === "active" ? "Ativo" : "Rascunho"}</small><h3>{product.name}</h3><p>{formatPrice(product.priceCents)} · {product.stock} em estoque · {(product.sizes?.length ?? 0) + (product.colors?.length ?? 0)} variações</p></div><div className="editor-product-actions">{product.status === "active" && <Link href={`/loja/${product.id}`}>Visualizar</Link>}<button className="editor-edit-product" type="button" onClick={() => editProduct(product)}><Pencil size={15} />Editar</button><button type="button" onClick={() => deleteProduct(product)} disabled={deleting === product.id}><Trash2 size={15} />{deleting === product.id ? "Excluindo" : "Excluir"}</button></div></article>
            ))}</div>}
          </section>
        </main>
      </div>
    </div>
  );
}
