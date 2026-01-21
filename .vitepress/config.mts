import { defineConfig } from 'vitepress'
import UnoCss from 'unocss/vite'
import { visualizer } from 'rollup-plugin-visualizer'
export default defineConfig({
  lang: 'zh-TW',

  title: "農家樂 桌遊 維基百科",
  description: "各式各樣的農家樂卡牌介紹與說明",
  appearance: 'force-dark',
  themeConfig: {
  },
  vite: {
    plugins: [
      UnoCss(),
      // visualizer({
      //   open: true,          // 打包完成后自动在浏览器打开分析报告
      //   filename: 'stats.html', // 生成的报告文件名
      //   gzipSize: true,      // 显示 gzip 后的体积
      //   brotliSize: true,    // 显示 brotli 后的体积
      // })
    ],

  },
  srcDir: './docs',
  rewrites: {
    'zh/cards/:id.md': 'cards/:id.md',
    'zh/index.md': 'index.md'
  },
  locales: {
    root: { label: '繁體中文', lang: 'zh-TW', link: '/' },
    en: {
      label: 'English', lang: 'en', link: '/en/',
      title: "agricola-cards-wiki",
      description: "agricola cards wiki site",
    },
    cn: {
      label: '简体中文', lang: 'cn', link: '/cn/',
      title: "农场主 桌游 维基百科",
      description: "各式各样的农家乐卡牌介绍与说明 翻译成简体",
    }
  }
})
