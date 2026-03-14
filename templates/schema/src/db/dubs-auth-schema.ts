import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

const createdAt = timestamp('created_at', { withTimezone: true })
  .defaultNow()
  .notNull();
const updatedAt = timestamp('updated_at', { withTimezone: true })
  .defaultNow()
  .notNull();
const deletedAt = timestamp('deleted_at', { withTimezone: true });

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  image: text('image'),
  stripeCustomerId: text('stripe_customer_id'),
  createdAt,
  updatedAt,
  deletedAt,
});

export const session = pgTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  token: text('token').notNull().unique(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  expiresAt: timestamp('expires_at', { withTimezone: true }).notNull(),
  activeOrganizationId: text('active_organization_id'),
  createdAt,
  updatedAt,
  deletedAt,
});

export const organization = pgTable('organization', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  logo: text('logo'),
  stripeCustomerId: text('stripe_customer_id'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt,
  updatedAt,
  deletedAt,
});

export const member = pgTable('member', {
  id: text('id').primaryKey(),
  organizationId: text('organization_id')
    .notNull()
    .references(() => organization.id),
  userId: text('user_id')
    .notNull()
    .references(() => user.id),
  role: text('role').notNull().default('member'),
  createdAt,
  updatedAt,
  deletedAt,
});

export const subscription = pgTable('subscription', {
  id: text('id').primaryKey(),
  referenceId: text('reference_id')
    .notNull()
    .references(() => organization.id),
  plan: text('plan').notNull(),
  status: text('status').notNull(),
  seats: integer('seats').notNull().default(1),
  stripeCustomerId: text('stripe_customer_id').notNull(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripePriceId: text('stripe_price_id'),
  currentPeriodStart: timestamp('current_period_start', { withTimezone: true }),
  currentPeriodEnd: timestamp('current_period_end', { withTimezone: true }),
  trialStart: timestamp('trial_start', { withTimezone: true }),
  trialEnd: timestamp('trial_end', { withTimezone: true }),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  cancelAt: timestamp('cancel_at', { withTimezone: true }),
  canceledAt: timestamp('canceled_at', { withTimezone: true }),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt,
  updatedAt,
  deletedAt,
});
