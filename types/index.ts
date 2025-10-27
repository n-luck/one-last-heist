import { z } from "zod";
import { insertCharacterSchema } from "@/lib/validators";

export type Character = z.infer<typeof insertCharacterSchema> & {
  id: string;
  slug: string;
  createdAt: Date
};
