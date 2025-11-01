import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { CharacterForm, CharacterFormProps } from "../CharacterForm";

const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

jest.mock("@/lib/actions/character.actions", () => ({
  createCharacter: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: { success: jest.fn(), error: jest.fn() },
}));

jest.mock("slugify", () => ({
  __esModule: true,
  default: (str: string) => str.toLowerCase().replace(/\s+/g, "-"),
}));

jest.mock("@uploadthing/react", () => ({
  generateUploadButton: jest.fn(
    () =>
      function MockUploadButton() {
        return <div>Upload Button</div>;
      }
  ),
  generateUploadDropzone: jest.fn(
    () =>
      function MockUploadDropzone() {
        return <div>Upload Dropzone</div>;
      }
  ),
}));

jest.mock("../../../lib/hooks/useCampaigns", () => ({
  useCampaigns: () => [
    { value: "Test Campaign 1", label: "Test Campaign 1" },
    { value: "Test Campaign 2", label: "Test Campaign 2" },
  ],
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("CharacterForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Element.prototype.scrollIntoView = jest.fn();
  });

  const defaultProps: CharacterFormProps = { type: "create", player: "Test" };

  it("renders form fields", () => {
    render(<CharacterForm {...defaultProps} />);
    expect(screen.getByLabelText("Character name*")).toBeInTheDocument();
    expect(screen.getByLabelText("Character slug (URL)*")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
  });

  it("generates a slug from name when clicking 'Generate' button", () => {
    render(<CharacterForm {...defaultProps} />);
    const nameInput = screen.getByLabelText(
      "Character name*"
    ) as HTMLInputElement;
    const slugInput = screen.getByLabelText(
      "Character slug (URL)*"
    ) as HTMLInputElement;

    fireEvent.change(nameInput, { target: { value: "Test Character" } });
    fireEvent.click(screen.getByText("Generate"));

    expect(slugInput.value).toBe("test-character");
  });
});
