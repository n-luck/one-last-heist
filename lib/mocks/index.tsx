import React from "react";
import { jest } from "@jest/globals";

// Router
export const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush }),
}));

// Actions
export const mockCreateCharacter = jest.fn();
jest.mock("@/lib/actions/character.actions", () => ({
  createCharacter: mockCreateCharacter,
  updateCharacter: jest.fn(),
}));
jest.mock("@/lib/actions/campaigns.actions", () => ({
  createCharacter: jest.fn(),
}));

export const mockCreateCampaign = jest.fn();
jest.mock("@/lib/actions/campaigns.actions", () => ({
  createCampaign: jest.fn(),
}));

// Toast
export const mockToastSuccess = jest.fn();
export const mockToastError = jest.fn();
jest.mock("sonner", () => ({
  toast: { success: mockToastSuccess, error: mockToastError },
}));

// Slugify
jest.mock("slugify", () => ({
  __esModule: true,
  default: (str: string) => str.toLowerCase().replace(/\s+/g, "-"),
}));

// UploadThing
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

// Campaigns Hook
jest.mock("@/lib/hooks/useCampaigns", () => ({
  useCampaigns: () => ({
    campaigns: [
      { value: "1", label: "Test Campaign 1" },
      { value: "2", label: "Test Campaign 2" },
    ],
    loading: false,
    error: null,
    refresh: jest.fn(),
  }),
}));

// Next cache
jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));
