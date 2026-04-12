import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";

// Tests are split into two projects:
//
//   1. `node` runs pure logic tests (seo helpers, sitemap loader, blog loader,
//      property-data integrity). These modules use Node primitives like
//      `process.env` or gray-matter's Buffer, so they need a Node runtime.
//
//   2. `browser` runs component tests in a real headless Chromium via
//      Playwright, per the project's "no jsdom" rule. Component tests import
//      React and interact with the DOM, so they get a real browser — no
//      jsdom quirks around layout, event handling, or custom elements.
//
// The React Router + Netlify plugins from vite.config.ts are intentionally
// excluded here: they generate virtual modules and SSR bundles that conflict
// with test runs.
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "node",
          environment: "node",
          include: ["tests/unit/**/*.test.ts"],
          exclude: ["node_modules", "build", ".netlify", "tests/e2e/**"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          setupFiles: ["./tests/setup.ts"],
          include: [
            "app/**/*.test.{ts,tsx}",
            "tests/unit/**/*.test.tsx",
          ],
          exclude: ["node_modules", "build", ".netlify", "tests/e2e/**"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
