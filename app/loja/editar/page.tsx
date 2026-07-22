import type { Metadata } from "next";
import { ProductEditor } from "@/components/shop/product-editor";

export const metadata: Metadata = {
  title: "Cadastrar produtos | DNA Guetos",
  description: "Editor interno de produtos DNA Guetos.",
  robots: { index: false, follow: false },
};

export default function ProductEditorPage() { return <ProductEditor />; }
