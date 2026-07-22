import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type BlogPost = typeof blogPosts.$inferSelect;

export const shopProducts = sqliteTable("shop_products", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  description: text("description").notNull().default(""),
  priceCents: integer("price_cents").notNull(),
  stock: integer("stock").notNull().default(0),
  image: text("image").notNull(),
  officialUrl: text("official_url").notNull().default(""),
  productType: text("product_type").notNull(),
  audience: text("audience").notNull().default("unissex"),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type ShopProduct = typeof shopProducts.$inferSelect;
