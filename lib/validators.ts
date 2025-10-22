import { z } from "zod";

export const insertCharacterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
  campaign: z.string().min(3, "Campaign must be at least 3 characters."),
  image: z.string().nullable(),
  player: z.string().min(3, "Player must be at least 3 characters."),
  primaryRole: z.string().min(3, "Primary role must be at least 3 characters."),
  secondaryRole: z
    .string()
    .min(3, "Secondary role must be at least 3 characters."),
  secondaryRole2: z
    .string()
    .min(3, "Secondary role must be at least 3 characters."),
  look: z.string().nullable(),
  background: z.string().nullable(),
  assets: z.string().nullable(),
  notes: z.string().nullable(),
  specialAbilities: z.array(z.string()).default([]),
  bonds: z.array(z.string()).default([]),
  pronouns: z.string().nullable(),
});

export const signInFormSchema = z.object({
  email: z.email("Invalid email address."),
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters."),
    email: z.email("Invalid email address."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z
      .string()
      .min(6, "Confirm password must be at least 6 characters long."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords need to match.",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  email: z.string().min(3, "Name must be at least 3 characters long."),
});
