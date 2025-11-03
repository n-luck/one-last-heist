import {
  signInWithCredentials,
  signUpUser,
  signOutUser,
  updateUserProfile,
  getAllUsers,
} from "../user.actions";
import prisma from "@/db/prisma";
import { auth, signIn, signOut } from "@/auth";
import { hashSync } from "bcrypt-ts-edge";
import { convertToPlainObject } from "@/lib/utils";

jest.mock("@/db/prisma", () => ({
  user: {
    create: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    findMany: jest.fn(),
  },
  character: {
    updateMany: jest.fn(),
  },
}));

jest.mock("@/auth", () => ({
  auth: jest.fn(),
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("bcrypt-ts-edge", () => ({
  hashSync: jest.fn((password) => `hashed-${password}`),
}));

jest.mock("@/lib/utils", () => ({
  formatError: jest.fn(() => "mocked error"),
  convertToPlainObject: jest.fn((data) => data),
}));

describe("User actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("signOutUser calls signOut", async () => {
    await signOutUser();
    expect(signOut).toHaveBeenCalled();
  });

  it("getAllUsers returns all users", async () => {
    const users = [
      { id: 1, name: "Jeeves" },
      { id: 2, name: "Wooster" },
    ];
    (prisma.user.findMany as jest.Mock).mockResolvedValue(users);

    const result = await getAllUsers();

    expect(prisma.user.findMany).toHaveBeenCalledWith({
      orderBy: { name: "asc" },
    });
    expect(convertToPlainObject).toHaveBeenCalledWith(users);
    expect(result).toEqual(users);
  });

  describe("signInWithCredentials", () => {
    it("returns success when credentials are valid", async () => {
      (signIn as jest.Mock).mockResolvedValue(true);

      const formData = new FormData();
      formData.set("email", "test@example.com");
      formData.set("password", "password123");

      const result = await signInWithCredentials(null, formData);

      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "test@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("returns failure on invalid credentials", async () => {
      (signIn as jest.Mock).mockImplementation(() => {
        throw new Error("Fail");
      });

      const formData = new FormData();
      formData.set("email", "wrong@example.com");
      formData.set("password", "badpass");

      const result = await signInWithCredentials(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("Invalid email or password.");
    });
  });

  describe("signUpUser", () => {
    it("creates a user, hashes password, and signs in", async () => {
      const formData = new FormData();
      formData.set("name", "Jeeves");
      formData.set("email", "jeeves@wooster.com");
      formData.set("password", "secret");
      formData.set("confirmPassword", "secret");

      (prisma.user.create as jest.Mock).mockResolvedValue({});
      (signIn as jest.Mock).mockResolvedValue({});

      const result = await signUpUser(null, formData);

      expect(hashSync).toHaveBeenCalledWith("secret", 10);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: {
          name: "Jeeves",
          email: "jeeves@wooster.com",
          password: "hashed-secret",
        },
      });
      expect(signIn).toHaveBeenCalledWith("credentials", {
        email: "jeeves@wooster.com",
        password: "secret",
      });
      expect(result.success).toBe(true);
    });

    it("returns error if validation fails", async () => {
      const formData = new FormData();
      formData.set("name", "");
      formData.set("email", "");
      formData.set("password", "");
      formData.set("confirmPassword", "");

      const result = await signUpUser(null, formData);

      expect(result.success).toBe(false);
      expect(result.message).toBe("mocked error");
    });
  });

  describe("updateUserProfile", () => {
    it("updates user and related characters", async () => {
      (auth as jest.Mock).mockResolvedValue({
        user: { id: 1, name: "OldName" },
      });
      (prisma.user.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        name: "OldName",
      });

      const result = await updateUserProfile({
        name: "NewName",
        email: "email@example.com",
      });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "NewName" },
      });
      expect(prisma.character.updateMany).toHaveBeenCalledWith({
        where: { player: "OldName" },
        data: { player: "NewName" },
      });
      expect(result.success).toBe(true);
    });

    it("returns error if user not found", async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 1 } });
      (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);

      const result = await updateUserProfile({
        name: "NewName",
        email: "email@example.com",
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe("mocked error");
    });
  });
});
