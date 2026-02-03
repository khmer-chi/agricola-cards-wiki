import * as OpenCC from 'opencc-js';

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const chExtend = (converterContent: { from: string, to: string }, langData: { [key: string]: string }) => {
    const converter = OpenCC.Converter(converterContent as { from: OpenCC.Locale, to: OpenCC.Locale });

    for (const key in langData) {
        const text = langData[key];
        langData[key] = converter(text);
    }
    return JSON.stringify(langData, null, 2)
}