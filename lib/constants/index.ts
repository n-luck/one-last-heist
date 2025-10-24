export const APP_NAME = "One Last Heist";
export const APP_DESCRIPTION = "Yet another campaign";
export const CHARACTER_LIMIT = 4;

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const characterDefaultValues = {
  name: "",
  slug: "",
  campaign: "",
  image: "/images/characters/placeholder.jpeg",
  primaryRole: "",
  secondaryRole: "",
  secondaryRole2: "",
  look: "",
  background: "",
  stress: [],
  assets: "",
  notes: "",
  specialAbilities: [],
  conditions: [],
  bonds: [],
  pronouns: "",
};
