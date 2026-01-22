import { parseHash2Object } from "./parseHash2Object.ts";

export const updateUrl = (payload: Record<string, string>) => {
    const oriObj = parseHash2Object();
    const newObj = { ...oriObj, ...payload };
    for (const key in payload) {
        if (payload[key] == "") {
            delete newObj[key];
        }
    }
    window.location.hash = new URLSearchParams(newObj).toString();
};