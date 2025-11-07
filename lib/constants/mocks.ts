export const campaignData = {
  name: "Test",
  slug: "test",
  image: null,
  notes: null,
  players: ["Test1", "Test2"],
  gameMaster: "Test",
};

export const mockCharacter = {
  name: "Jeeves",
  slug: "jeeves",
  campaign: "Wrangling Wooster",
  image: null,
  player: "Reginald",
  primaryRole: "The Face",
  secondaryRole: "The Muscle",
  secondaryRole2: "The Brains",
  look: null,
  background: null,
  assets: null,
  notes: null,
  specialAbilities: ["Smarts"],
  bonds: [],
  conditions: [],
  stress: [],
  pronouns: null,
};

export const mockSession = {
  user: {
    name: "Jeeves",
    email: "jeeves@wooster.com",
  },
};

export function createMockPointerEvent(
  type: string,
  props: PointerEventInit = {}
): PointerEvent {
  const event = new Event(type, props) as PointerEvent;
  Object.assign(event, {
    button: props.button ?? 0,
    ctrlKey: props.ctrlKey ?? false,
    pointerType: props.pointerType ?? "mouse",
  });
  return event;
}
