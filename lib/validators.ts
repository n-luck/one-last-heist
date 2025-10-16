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
  specialAbilities: z.string().min(3, "Special abilities must be at least 3 characters."),
  bonds: z.string().min(3, "Bonds must be at least 3 characters."),
  pronouns: z.string().nullable(),
});
