import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import netlifyReactRouter from "@netlify/vite-plugin-react-router";
import netlify from "@netlify/vite-plugin";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    // Netlify adapter must come after reactRouter() — it patches the server
    // build into a Netlify Function handler.
    netlifyReactRouter(),
    // Local Netlify platform emulation (forms, functions, headers) in dev.
    netlify(),
  ],
});
