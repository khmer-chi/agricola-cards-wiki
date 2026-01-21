import Layout from './Layout.vue';
import type { Theme } from 'vitepress';
import DefaultTheme from 'vitepress/theme';
import "virtual:uno.css"
import CardPage from './components/CardPage.vue';
import Index from './components/Index.vue';
export default {
    extends: DefaultTheme,
    Layout,
    enhanceApp({ app }) {
        app.component('CardPage', CardPage);
        app.component('Index', Index);
    },
} satisfies Theme;

