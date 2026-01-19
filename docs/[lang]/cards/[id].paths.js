import { readFileSync } from 'node:fs'

export default {
    paths() {
        const cards = JSON.parse(readFileSync('./docs/cardMap.json', 'utf-8'))
        const result = [];
        const langArray = [
            { name: 'en', object: {} },
            { name: 'cn', object: JSON.parse(readFileSync('./docs/lang_cn.json', 'utf-8')) },
            { name: 'zh', object: JSON.parse(readFileSync('./docs/lang_zh.json', 'utf-8')) },
        ]

        for (let i = 0; i < cards.length; i++) {
            const [, card] = cards[i]
            for (let j = 0; j < langArray.length; j++) {
                const { name, object } = langArray[j]
                result.push({
                    params: {
                        ...card,
                        name: object[card.name] ?? card.name,
                        desc: card.desc.map(v => {
                            return object[v] ?? v
                        }),
                        lang: name
                    },
                })
            }
        }
        // console.log(result)
        return result
    }
}