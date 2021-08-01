import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { ViteFaviconsPlugin } from "vite-plugin-favicon";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
  ],
  root: "web",
  base: "/vue-word-highlighter/"
})
