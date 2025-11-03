import { useSession } from "next-auth/react";
import { renderHook } from "@testing-library/react";

import { useIsLoggedIn } from "../useIsLoggedIn";
import { mockSession } from "@/lib/constants/mocks";


jest.mock("next-auth/react");
jest.mock("next-auth/react", () => ({ useSession: jest.fn() }));

describe("useIsLoggedIn hook", () => {
  const mockUseSession = useSession as jest.Mock;
  
  it("returns logged in state when session status is authenticated", () => {
    mockUseSession.mockReturnValue({
      data: mockSession,
      status: "authenticated",
    });
    const { result } = renderHook(() => useIsLoggedIn());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(true);
    expect(result.current.session).toEqual(mockSession);
  });

  it("returns not logged in state when session status is unauthenticated", () => {
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
    const { result } = renderHook(() => useIsLoggedIn());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.isLoggedIn).toBe(false);
    expect(result.current.session).toBeNull();
  });
});
