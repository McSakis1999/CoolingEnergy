// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://mcsakis1999.github.io",
  base: "/CoolingEnergy",

  vite: {
    plugins: [tailwindcss()],
  },
});
