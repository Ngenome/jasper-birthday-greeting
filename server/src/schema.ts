
import { z } from 'zod';

// Simple greeting schema for the birthday message
export const greetingSchema = z.object({
  message: z.string(),
  recipient: z.string(),
  timestamp: z.coerce.date()
});

export type Greeting = z.infer<typeof greetingSchema>;

// Input schema for getting greeting (no input needed for static message)
export const getGreetingInputSchema = z.object({}).optional();

export type GetGreetingInput = z.infer<typeof getGreetingInputSchema>;
