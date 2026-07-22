import type { Metadata } from "next";
import { BlogPostDetail } from "@/components/blog/blog-post-detail";
import { SiteShell } from "@/components/layout/site-shell";

export const metadata: Metadata = { title: "Post | Blog Hub Afro", description: "Leia o post completo no Blog do Hub Afro." };

export default function BlogPostPage() {
  return <SiteShell><BlogPostDetail /></SiteShell>;
}
