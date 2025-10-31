import { z } from "zod";
import {
  insertCampaignSchema,
  insertCharacterSchema,
  updateProfileSchema,
} from "@/lib/validators";

export type Character = z.infer<typeof insertCharacterSchema> & {
  id: string;
  slug: string;
  createdAt: Date;
};

export type Campaign = z.infer<typeof insertCampaignSchema> & {
  id: string;
  createdAt: Date;
};

export type User = z.infer<typeof updateProfileSchema> & {
  role: string;
};
