import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base relativa: funciona em qualquer link do GitHub Pages (utilizador.github.io/repo/)
export default defineConfig({ base: "./", plugins: [react()] });
