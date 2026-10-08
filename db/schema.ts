import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { ProductCatalogData } from "@/lib/products";

export const blogPosts = sqliteTable("blog_posts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  category: text("category").notNull(),
  excerpt: text("excerpt").notNull().default(""),
  content: text("content").notNull(),
  image: text("image").notNull().default(""),
  seoTitle: text("seo_title").notNull().default(""),
  seoDescription: text("seo_description").notNull().default(""),
  publicationStatus: text("publication_status").notNull().default("published"),
  publishedAt: text("published_at").notNull().default(""),
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
  sizes: text("sizes", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  colors: text("colors", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  extraCategories: text("extra_categories", { mode: "json" }).$type<string[]>().notNull().default(sql`'[]'`),
  colorImages: text("color_images", { mode: "json" }).$type<Array<{ color: string; image: string }>>().notNull().default(sql`'[]'`),
  catalogData: text("catalog_data", { mode: "json" }).$type<ProductCatalogData>().notNull().default(sql`'{}'`),
  status: text("status").notNull().default("active"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type ShopProduct = typeof shopProducts.$inferSelect;

export const catalogImports = sqliteTable("catalog_imports", {
  key: text("key").primaryKey(),
  importedAt: text("imported_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type ShopOrderItem = {
  productId: number;
  name: string;
  quantity: number;
  unitPriceCents: number;
};

export const shopOrders = sqliteTable("shop_orders", {
  id: text("id").primaryKey(),
  status: text("status").notNull().default("created"),
  totalCents: integer("total_cents").notNull(),
  items: text("items", { mode: "json" }).$type<ShopOrderItem[]>().notNull(),
  preferenceId: text("preference_id").notNull().default(""),
  paymentId: text("payment_id").notNull().default(""),
  checkoutUrl: text("checkout_url").notNull().default(""),
  mode: text("mode").notNull().default("test"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export type ShopOrder = typeof shopOrders.$inferSelect;

export const commercialLeads = sqliteTable("commercial_leads", {
  id: text("id").primaryKey(),
  protocol: text("protocol").notNull(),
  topic: text("topic").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  whatsapp: text("whatsapp").notNull().default(""),
  cityState: text("city_state").notNull().default(""),
  company: text("company").notNull().default(""),
  role: text("role").notNull().default(""),
  eventDate: text("event_date").notNull().default(""),
  estimatedAudience: integer("estimated_audience").notNull().default(0),
  requestType: text("request_type").notNull().default(""),
  message: text("message").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull().default(false),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const newsletterSubscribers = sqliteTable("newsletter_subscribers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull(),
  status: text("status").notNull().default("active"),
  unsubscribeToken: text("unsubscribe_token").notNull(),
  consentAt: text("consent_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  unsubscribedAt: text("unsubscribed_at").notNull().default(""),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const dataConsents = sqliteTable("data_consents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  subjectType: text("subject_type").notNull(),
  subjectId: text("subject_id").notNull(),
  purpose: text("purpose").notNull(),
  granted: integer("granted", { mode: "boolean" }).notNull(),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});
