CREATE TABLE IF NOT EXISTS "user" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "email" text NOT NULL UNIQUE,
  "email_verified" boolean NOT NULL DEFAULT false,
  "image" text,
  "stripe_customer_id" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "organization" (
  "id" text PRIMARY KEY,
  "name" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "logo" text,
  "stripe_customer_id" text,
  "metadata" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "member" (
  "id" text PRIMARY KEY,
  "organization_id" text NOT NULL REFERENCES "organization" ("id"),
  "user_id" text NOT NULL REFERENCES "user" ("id"),
  "role" text NOT NULL DEFAULT 'member',
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "session" (
  "id" text PRIMARY KEY,
  "user_id" text NOT NULL REFERENCES "user" ("id"),
  "token" text NOT NULL UNIQUE,
  "ip_address" text,
  "user_agent" text,
  "expires_at" timestamptz NOT NULL,
  "active_organization_id" text,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz
);

CREATE TABLE IF NOT EXISTS "subscription" (
  "id" text PRIMARY KEY,
  "reference_id" text NOT NULL REFERENCES "organization" ("id"),
  "plan" text NOT NULL,
  "status" text NOT NULL,
  "seats" integer NOT NULL DEFAULT 1,
  "stripe_customer_id" text NOT NULL,
  "stripe_subscription_id" text NOT NULL UNIQUE,
  "stripe_price_id" text,
  "current_period_start" timestamptz,
  "current_period_end" timestamptz,
  "trial_start" timestamptz,
  "trial_end" timestamptz,
  "cancel_at_period_end" boolean NOT NULL DEFAULT false,
  "cancel_at" timestamptz,
  "canceled_at" timestamptz,
  "metadata" jsonb,
  "created_at" timestamptz NOT NULL DEFAULT now(),
  "updated_at" timestamptz NOT NULL DEFAULT now(),
  "deleted_at" timestamptz
);
