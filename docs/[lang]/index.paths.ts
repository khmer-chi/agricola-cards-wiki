import { readFileSync } from "node:fs"
import { chExtend } from "../../chExtend.ts"
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const readAgricolaCrawlerFile = (fileName: string) => {
    return JSON.parse(readFileSync(join(__dirname, '..', '..', '..', 'agricola-crawler', fileName), 'utf-8'))
}
export default {
    paths() {
        const cardRank = readAgricolaCrawlerFile('cardRank.json');
        const cnObject = readAgricolaCrawlerFile('langCn.json');
        const zhObject = readAgricolaCrawlerFile('langZh.json');
        const cn2zhObject = chExtend({ from: 'cn', to: 't' }, cnObject);
        const zh2cnObject = chExtend({ from: 'cn', to: 't' }, zhObject);
        const cardMap = readAgricolaCrawlerFile('cardMap.json');
        const allCardData = readAgricolaCrawlerFile('allCardData.json');
        const cardData = Array.from(new Map<string, any>([...cardMap, ...allCardData]))
        const langObject = {
            en: { object: {}, extend: {} },
            cn: { object: cnObject, extend: cn2zhObject },
            zh: { object: zhObject, extend: zh2cnObject },
        }

        // console.log({ cardRank })
        return ['en', 'cn', 'zh'].map((name) => {
            return { params: { lang: name, langObject, cardRank, cardData } }
        })
    }
}