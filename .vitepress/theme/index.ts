// import Layout from '@/.vitepress/theme/Layout.vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import "virtual:uno.css"
// import CardDetail from './components/CardDetail.vue';
export default {
    extends: DefaultTheme,
    //   Layout,
    // enhanceApp({ app }) {
    //     app.component('CardDetail', CardDetail);
    // },
} satisfies Theme;
