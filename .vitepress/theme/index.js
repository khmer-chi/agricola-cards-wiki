import DefaultTheme from 'vitepress/theme'
import CardDetail from './components/CardDetail.vue'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        // 注册全局组件
        app.component('CardDetail', CardDetail)
    }
}