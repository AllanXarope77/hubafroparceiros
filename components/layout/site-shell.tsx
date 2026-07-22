import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { CartProvider } from "@/components/shop/cart-provider";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </CartProvider>
  );
}
