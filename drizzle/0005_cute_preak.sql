CREATE TABLE `shop_orders` (
	`id` text PRIMARY KEY NOT NULL,
	`status` text DEFAULT 'created' NOT NULL,
	`total_cents` integer NOT NULL,
	`items` text NOT NULL,
	`preference_id` text DEFAULT '' NOT NULL,
	`payment_id` text DEFAULT '' NOT NULL,
	`checkout_url` text DEFAULT '' NOT NULL,
	`mode` text DEFAULT 'test' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
