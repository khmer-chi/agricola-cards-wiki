import { readFileSync } from 'node:fs'
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readAgricolaCrawlerFile = (fileName: string) => {
    return JSON.parse(readFileSync(join(__dirname, '..', '..', '..', '..', 'agricola-crawler', fileName), 'utf-8'))
}
export default {
    paths() {
        // const cardRank = readAgricolaCrawlerFile('cardRank.json');
        const cnObject = readAgricolaCrawlerFile('langCn.json');
        const zhObject = readAgricolaCrawlerFile('langZh.json');
        const cardMap = readAgricolaCrawlerFile('cardMap.json');
        const allCardData = readAgricolaCrawlerFile('allCardData.json');
        const cardData = Array.from(new Map<string, any>([...cardMap, ...allCardData]))
        const result = [];
        const langArray = [
            { name: 'en', object: {} },
            { name: 'cn', object: cnObject },
            { name: 'zh', object: zhObject },
        ]

        for (let i = 0; i < cardData.length; i++) {
            const [, card] = cardData[i]
            for (let j = 0; j < langArray.length; j++) {
                const { name, object } = langArray[j]
                result.push({
                    params: {
                        ...card,
                        name: object[card.name] ?? card.name,
                        desc: card.desc.map((v: string) => {
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