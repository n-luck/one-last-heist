import { cn, convertToPlainObject, formatError } from "../utils";

describe("utils function", () => {
  describe("cn", () => {
    it("should merge class names correctly", () => {
      const result = cn(
        "text-center",
        "font-bold",
        undefined,
        false && "hidden"
      );
      expect(result).toBe("text-center font-bold");
    });
  });

  describe("convertToPlainObject", () => {
    it("should convert object to plain JSON object", () => {
      const obj = { a: 1, b: { c: 2 } };
      const result = convertToPlainObject(obj);
      expect(result).toEqual(obj);
      expect(result).not.toBe(obj);
    });
  });

  describe("formatError", () => {
    it("should format ZodError correctly", async () => {
      const error = {
        name: "ZodError",
        issues: [{ message: "Invalid name" }, { message: "Required field" }],
      };
      const result = await formatError(error);
      expect(result).toBe("Invalid name. Required field");
    });

    it("should format Prisma P2002 error correctly", async () => {
      const error = {
        name: "PrismaClientKnownRequestError",
        code: "P2002",
        meta: { target: ["email"] },
      };
      const result = await formatError(error);
      expect(result).toBe("Email already exists.");
    });

    it("should format unknown error with string message", async () => {
      const error = { name: "OtherError", message: "Something went wrong" };
      const result = await formatError(error);
      expect(result).toBe("Something went wrong");
    });

    it("should format unknown error with non-string message", async () => {
      const error = { name: "OtherError", message: { detail: "fail" } };
      const result = await formatError(error);
      expect(result).toBe(JSON.stringify({ detail: "fail" }));
    });

    it("should handle Prisma P2002 error without target", async () => {
      const error = {
        name: "PrismaClientKnownRequestError",
        code: "P2002",
      };
      const result = await formatError(error);
      expect(result).toBe("Field already exists.");
    });
  });
});
