import { defineConfig, presetIcons, presetUno } from 'unocss'
import transformerDirectives from '@unocss/transformer-directives'
export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
  ],
  theme: {

  },
  transformers: [
    transformerDirectives({
      enforce: 'pre',
    }),
  ],
})