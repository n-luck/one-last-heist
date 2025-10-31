export const characterConditions = [
  {
    label: "Flustered",
    description:
      "No penalty while marked. Clears when you have a chance to catch your breath for half an hour after a scene.",
  },
  {
    label: "Bloodied",
    description:
      "When marked, your actions take a –1d penalty. Clears when you receive first aid and rest for at least a couple of hours.",
  },
  {
    label: "Depleted",
    description:
      "When marked, your actions have less reward. Clears when you have a chance to regroup and restock.",
  },
  {
    label: "Helpless",
    description:
      "When marked, youcannot make action rolls unless youspend 2 stress or someone helps you in the fiction. Clears when you receive hospital-grade attention (or at the very least, see a back-alley doc and take the night off).",
  },
];

export const teamwork = [
  "Assist a teammate",
  "Perform a baton pass",
  "Set up a teammate",
  "Invoke a bond",
];

export const odds = [
  "Push yourself (take 2 stress) or accept Collateral Damage for +1d",
  "Increase your risk for greater reward",
  "Flashback to set up or acquire an asset",
];

export const characterTextFields = [
  { name: "pronouns", label: "Pronouns" },
  { name: "campaign", label: "Campaign*", type: "select" },
  { name: "primaryRole", label: "Primary role*", type: "select" },
  { name: "secondaryRole", label: "Secondary role #1*", type: "select" },
  { name: "secondaryRole2", label: "Secondary role #2*", type: "select" },
  { name: "look", label: "Look" },
  { name: "assets", label: "Assets" },
];

export const roleOptions = [
  { label: "The Face", value: "The Face" },
  { label: "The Brains", value: "The Brains" },
  { label: "The Hacker", value: "The Hacker" },
  { label: "The Muscle", value: "The Muscle" },
  { label: "The Thief", value: "The Thief" },
];
