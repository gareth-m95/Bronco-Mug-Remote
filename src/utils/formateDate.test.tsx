import { describe, it, expect } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("correctly formats ISO date strings to dd-mm-yyyy", () => {
    expect(formatDate("2021-06-18T00:51:01.161Z")).toBe("18-06-2021");
    expect(formatDate("1999-12-31T23:59:59Z")).toBe("31-12-1999");
    expect(formatDate("2023-01-01T00:00:00Z")).toBe("01-01-2023");
  });

  it("pads single-digit days and months with leading zero", () => {
    expect(formatDate("2021-02-05T10:20:30Z")).toBe("05-02-2021");
    expect(formatDate("2021-09-09T10:20:30Z")).toBe("09-09-2021");
  });
});
