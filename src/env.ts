import { z } from 'zod';

const DubsEnvSchema = z.object({
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
  NEXT_PUBLIC_BETTER_AUTH_URL: z.url().optional(),
  STRIPE_SECRET_KEY: z.string().min(1),
  STRIPE_WEBHOOK_SECRET: z.string().min(1),
});

export type DubsEnv = z.infer<typeof DubsEnvSchema>;

export const validateDubsEnv = (
  input: Record<string, string | undefined>,
): DubsEnv => DubsEnvSchema.parse(input);

export { DubsEnvSchema };
