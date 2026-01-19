import { defineConfig } from 'vitepress'
import UnoCss from 'unocss/vite'
export default defineConfig({
  title: "agricola-cards-wiki",
  description: "agricola cards wiki site",
  themeConfig: {
  },
  vite: {
    plugins: [
      UnoCss(),
    ],
  },
  srcDir: './docs',
})
