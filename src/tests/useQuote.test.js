import { renderHook } from "@testing-library/react-hooks";
import axios from "axios";
import useQuote from "../hooks/useQuote";

jest.mock("axios");

describe("useQuote Hook", () => {
  it("should fetch and return a quote", async () => {
    const mockQuote = {
      data: {
        content: "Test Quote",
        author: "Test Author",
      },
    };
    axios.get.mockResolvedValueOnce(mockQuote);

    const { result, waitForNextUpdate } = renderHook(() => useQuote());
    await waitForNextUpdate();

    expect(result.current).toEqual({
      quote: "Test Quote",
      author: "Test Author",
    });
  });

  it("should handle API errors", async () => {
    axios.get.mockRejectedValueOnce(new Error("API Error"));

    const { result, waitForNextUpdate } = renderHook(() => useQuote());
    await waitForNextUpdate();

    expect(result.current).toEqual({
      quote: "Unable to fetch quote",
      author: "N/A",
    });
  });
});
