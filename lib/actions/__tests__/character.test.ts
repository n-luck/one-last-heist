import { revalidatePath } from "next/cache";

import prisma from "@/db/prisma";
import { convertToPlainObject } from "@/lib/utils";
import { CHARACTER_LIMIT } from "@/lib/constants";
import {
  getAllCharacters,
  getLatestCharacters,
  getCharacterBySlug,
  getCharactersByPlayer,
  getCharacterById,
  createCharacter,
  updateCharacter,
  updateCharacterCheckboxes,
  getCharactersByCampaign,
} from "../character.actions";
import { Character } from "@/types";
import { mockCharacter } from "@/lib/constants/mocks";

jest.mock("@/db/prisma", () => ({
  character: {
    findMany: jest.fn(),
    findFirst: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
}));

jest.mock("next/cache", () => ({ revalidatePath: jest.fn() }));

jest.mock("@/lib/utils", () => ({
  convertToPlainObject: jest.fn((data) => data),
  formatError: jest.fn(() => "mocked error"),
}));

describe("Character actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getAllCharacters returns all characters ordered alphabetically by name", async () => {
    (prisma.character.findMany as jest.Mock).mockResolvedValue([mockCharacter]);
    const result = await getAllCharacters();

    expect(prisma.character.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
    });
    expect(convertToPlainObject).toHaveBeenCalledWith([mockCharacter]);
    expect(result).toEqual([mockCharacter]);
  });

  it("getLatestCharacters returns latest characters limited by CHARACTER_LIMIT", async () => {
    (prisma.character.findMany as jest.Mock).mockResolvedValue([mockCharacter]);
    const result = await getLatestCharacters();

    expect(prisma.character.findMany).toHaveBeenCalledWith({
      take: CHARACTER_LIMIT,
      orderBy: { createdAt: "desc" },
    });
    expect(convertToPlainObject).toHaveBeenCalledWith([mockCharacter]);
    expect(result).toEqual([mockCharacter]);
  });

  it("getCharacterBySlug returns character by slug", async () => {
    (prisma.character.findFirst as jest.Mock).mockResolvedValue(mockCharacter);
    const result = await getCharacterBySlug("Jeeves");

    expect(prisma.character.findFirst).toHaveBeenCalledWith({
      where: { slug: "Jeeves" },
    });
    expect(result).toEqual(mockCharacter);
  });

  it("getCharactersByPlayer returns characters for a player", async () => {
    (prisma.character.findMany as jest.Mock).mockResolvedValue([mockCharacter]);
    const result = await getCharactersByPlayer("Reginald");

    expect(prisma.character.findMany).toHaveBeenCalledWith({
      where: { player: "Reginald" },
    });
    expect(result).toEqual([mockCharacter]);
  });

  it("getCharacterById returns character by id", async () => {
    (prisma.character.findFirst as jest.Mock).mockResolvedValue(mockCharacter);
    const result = await getCharacterById("1");

    expect(prisma.character.findFirst).toHaveBeenCalledWith({
      where: { id: "1" },
    });
    expect(result).toEqual(mockCharacter);
  });

  it("getCharactersByCampaign returns characters for a campaign", async () => {
    (prisma.character.findMany as jest.Mock).mockResolvedValue([mockCharacter]);
    const result = await getCharactersByCampaign("Wrangling Wooster");

    expect(prisma.character.findMany).toHaveBeenCalledWith({
      where: { campaign: "Wrangling Wooster" },
      orderBy: { name: "asc" },
    });
    expect(result).toEqual([mockCharacter]);
  });

  describe("createCharacter", () => {
    it("creates a character and revalidates path", async () => {
      (prisma.character.create as jest.Mock).mockResolvedValue(mockCharacter);
      const result = await createCharacter(mockCharacter);

      expect(prisma.character.create).toHaveBeenCalledWith({
        data: mockCharacter,
      });
      expect(revalidatePath).toHaveBeenCalledWith("/user");
      expect(result.success).toBe(true);
    });

    it("returns error on invalid data", async () => {
      const invalidData = { name: "" };
      const result = await createCharacter(invalidData as Character);

      expect(result.success).toBe(false);
      expect(result.message).toBe("mocked error");
    });
  });

  describe("updateCharacter", () => {
    it("updates character when it exists", async () => {
      const mockCharacterWithId = { ...mockCharacter, id: "1" };
      (prisma.character.findFirst as jest.Mock).mockResolvedValue(
        mockCharacterWithId
      );
      (prisma.character.update as jest.Mock).mockResolvedValue(mockCharacterWithId);
      const result = await updateCharacter(mockCharacterWithId);

      expect(prisma.character.update).toHaveBeenCalledWith({
        where: { id: "1" },
        data: mockCharacterWithId,
      });
      expect(revalidatePath).toHaveBeenCalledWith("/user");
      expect(result.success).toBe(true);
    });

    it("returns error if character not found", async () => {
      (prisma.character.findFirst as jest.Mock).mockResolvedValue(null);
      const result = await updateCharacter({ ...mockCharacter, id: "1" });

      expect(result.success).toBe(false);
      expect(result.message).toBe("mocked error");
    });
  });

  describe("updateCharacterCheckboxes", () => {
    it("updates checkboxes and revalidates path", async () => {
      (prisma.character.update as jest.Mock).mockResolvedValue(mockCharacter);
      const result = await updateCharacterCheckboxes("Jeeves", "conditions", [
        true,
        false,
      ]);

      expect(prisma.character.update).toHaveBeenCalledWith({
        where: { slug: "Jeeves" },
        data: { conditions: [true, false] },
      });
      expect(revalidatePath).toHaveBeenCalledWith("/characters/Jeeves");
      expect(result.success).toBe(true);
    });

    it("returns error on failure", async () => {
      (prisma.character.update as jest.Mock).mockImplementation(() => {
        throw new Error("fail");
      });
      const result = await updateCharacterCheckboxes("Jeeves", "conditions", [
        true,
        false,
      ]);

      expect(result.success).toBe(false);
      expect(result.message).toBe("mocked error");
    });
  });
});
