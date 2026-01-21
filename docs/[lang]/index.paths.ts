import { readFileSync } from "node:fs"

export default {
    paths() {
        const langObject = {
            en: { object: {}, extend: {} },
            cn: { object: JSON.parse(readFileSync('./docs/lang_cn.json', 'utf-8')), extend: JSON.parse(readFileSync('./docs/lang_zh2cn.json', 'utf-8')) },
            zh: { object: JSON.parse(readFileSync('./docs/lang_zh.json', 'utf-8')), extend: JSON.parse(readFileSync('./docs/lang_cn2zh.json', 'utf-8')) },
        }

        return ['en', 'cn', 'zh'].map((name) => {
            return { params: { lang: name, langObject } }
        })
    }
}