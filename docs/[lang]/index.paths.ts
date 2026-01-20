import { readFileSync } from "node:fs"

export default {
    paths() {
        const langArray = [
            { name: 'en', object: {} },
            { name: 'cn', object: JSON.parse(readFileSync('./docs/lang_cn.json', 'utf-8')) },
            { name: 'zh', object: JSON.parse(readFileSync('./docs/lang_zh.json', 'utf-8')) },
        ]
        return langArray.map(({ name, object }) => {
            return { params: { lang: name, langObject: object } }
        })
    }
}