CREATE TABLE `shop_products` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`description` text DEFAULT '' NOT NULL,
	`price_cents` integer NOT NULL,
	`stock` integer DEFAULT 0 NOT NULL,
	`image` text NOT NULL,
	`official_url` text DEFAULT '' NOT NULL,
	`product_type` text NOT NULL,
	`audience` text DEFAULT 'unissex' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
