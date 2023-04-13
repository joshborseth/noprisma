import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../pages";

test("there is an h1 on the home page", () => {
  render(<Home />);
  const h1 = screen.getByRole("heading", { level: 1 });
  expect(h1).toBeDefined();
});
