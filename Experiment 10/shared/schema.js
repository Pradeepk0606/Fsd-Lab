import { z } from "zod";

export const insertUserSchema = z.object({
  username: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(1)
});

export const insertPostSchema = z.object({
  image: z.string().min(1),
  caption: z.string().min(1)
});