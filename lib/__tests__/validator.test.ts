import {
  insertCharacterSchema,
  updateCharacterSchema,
  signInFormSchema,
  signUpFormSchema,
  updateProfileSchema,
  insertCampaignSchema,
  updateCampaignSchema,
} from "../validators";
import { z } from "zod";

describe("Zod Schemas", () => {
  describe("insertCharacterSchema", () => {
    it("should pass with valid data", () => {
      const validData = {
        name: "Test",
        slug: "test",
        campaign: "Test Campaign",
        image: "",
        player: "Test",
        primaryRole: "The Face",
        secondaryRole: "The Brains",
        secondaryRole2: "The Muscle",
        look: "",
        background: "",
        assets: "",
        notes: "",
        specialAbilities: ["Test"],
        bonds: ["Test1", "Test2"],
        conditions: [true, false],
        stress: ["Fear"],
        pronouns: "she/her",
      };
      expect(() => insertCharacterSchema.parse(validData)).not.toThrow();
    });

    it("should throw error when required fields are missing", () => {
      const invalidData = {
        name: "Fail",
        slug: "",
        campaign: "Fa",
        player: "F",
        primaryRole: "",
        secondaryRole: "",
        secondaryRole2: "",
      };
      expect(() => insertCharacterSchema.parse(invalidData)).toThrow(
        z.ZodError
      );
    });
  });

  describe("updateCharacterSchema", () => {
    it("should require id field", () => {
      const invalidData = {
        name: "Test",
        slug: "test",
        campaign: "Test Campaign",
        player: "Test",
        primaryRole: "The Face",
        secondaryRole: "The Muscle",
        secondaryRole2: "The Thief",
      };
      expect(() => updateCharacterSchema.parse(invalidData)).toThrow();
    });
  });

  describe("signInFormSchema", () => {
    it("should accept valid email and password", () => {
      const validData = { email: "test@test.com", password: "123456" };
      expect(() => signInFormSchema.parse(validData)).not.toThrow();
    });

    it("should throw on invalid email", () => {
      const invalidData = { email: "not-an-email", password: "123456" };
      expect(() => signInFormSchema.parse(invalidData)).toThrow();
    });
  });

  describe("signUpFormSchema", () => {
    it("should throw if passwords do not match", () => {
      const invalidData = {
        name: "Test",
        email: "Test@test.com",
        password: "123456",
        confirmPassword: "654321",
      };
      expect(() => signUpFormSchema.parse(invalidData)).toThrow(
        /Passwords need to match/
      );
    });
  });

  describe("updateProfileSchema", () => {
    it("should fail if name is too short", () => {
      const invalidData = { name: "Te", email: "test@test.com" };
      expect(() => updateProfileSchema.parse(invalidData)).toThrow();
    });
  });

  describe("insertCampaignSchema", () => {
    it("should apply default values", () => {
      const data = {
        name: "Test",
        slug: "test",
        image: null,
        notes: null,
      };
      const parsed = insertCampaignSchema.parse(data);
      expect(parsed.players).toEqual([]);
    });
  });

  describe("updateCampaignSchema", () => {
    it("should require id field", () => {
      const invalidData = { name: "Fail", slug: "fail" };
      expect(() => updateCampaignSchema.parse(invalidData)).toThrow();
    });
  });
});
