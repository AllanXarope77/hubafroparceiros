import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Navbar } from "./navbar";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

