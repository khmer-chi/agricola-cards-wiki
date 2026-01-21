import * as OpenCC from 'opencc-js';

import { readFileSync, writeFileSync } from 'node:fs';

[
    { converterContent: { from: 'cn', to: 't' }, file: { from: `./docs/lang_cn.json`, to: `./docs/lang_cn2tw.json` } },
    { converterContent: { from: 't', to: 'cn' }, file: { from: `./docs/lang_zh.json`, to: `./docs/lang_zh2cn.json` } },
].map(({ converterContent, file }) => {

    const converter = OpenCC.Converter(converterContent as { from: OpenCC.Locale, to: OpenCC.Locale });
    const lang_cn = JSON.parse(readFileSync(file.from, 'utf-8')) as any[];
    console.log({ lang_cn })
    for (const key in lang_cn) {
        const text = lang_cn[key];
        lang_cn[key] = converter(text);
    }

    writeFileSync(file.to, JSON.stringify(lang_cn, null, 2), 'utf-8');
})