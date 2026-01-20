import { defineConfig } from 'vitepress'
import UnoCss from 'unocss/vite'
export default defineConfig({
  lang: 'zh-TW',

  title: "農家樂 桌遊 維基百科",
  description: "各式各樣的農家樂卡牌介紹與說明",
  themeConfig: {
    // 當前語言是中文時，下拉選單顯示的提示文字
    // selectLanguageText: '切換語言',
    // 多語系切換器中，標示「這是我現在的語言」的標籤
    // selectLanguageAriaLabel: '選擇語言',
  },
  vite: {
    plugins: [
      UnoCss(),
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
