import * as OpenCC from 'opencc-js';
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const chExtend = (converterContent: { from: string, to: string }, langData: { [key: string]: string }) => {
    const converter = OpenCC.Converter(converterContent as { from: OpenCC.Locale, to: OpenCC.Locale });
    const copyLangData = { ...langData }
    for (const key in copyLangData) {
        const text = copyLangData[key];
        copyLangData[key] = converter(text);
    }
    return JSON.stringify(copyLangData, null, 2)
}