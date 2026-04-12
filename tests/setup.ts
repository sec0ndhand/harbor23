import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Unmount any rendered React components between tests so state doesn't leak
// across test boundaries. Vitest Browser Mode tears down the page between
// files automatically, but not between `it()` blocks in the same file.
afterEach(() => {
  cleanup();
});
