import { getLangObject } from "./getLangObject.ts";
import { transformString } from "./transformString.ts";


export const filterCard = (cardData: [string, any][], langObject: Record<string, any>, searchQuery: string, currentDeck: string, currentPlayer: string) => {
    const cardMapSorted = cardData.toSorted(([, a], [, b]) => {
        return transformString(a.numbering) - transformString(b.numbering);
    });
    if (!searchQuery && currentDeck == "" && currentPlayer == "")
        return cardMapSorted;

    return cardMapSorted.filter(([, item]) => {
        if (currentDeck != "") {
            if (item.deck != currentDeck) return false;
        }
        if (currentPlayer != "") {
            if (item.players != currentPlayer) return false;
        }
        const searchLower = searchQuery.toLowerCase();
        const langArray = ["zh", "cn", "en"];
        if (item.id.toLowerCase().includes(searchLower)) return true;
        if (item.numbering.toLowerCase().includes(searchLower)) return true;
        for (let i = 0; i < langArray.length; i++) {
            const langName = langArray[i];
            const name = getLangObject(langObject, langName, "object", item.name);
            if (name.toLowerCase().includes(searchLower)) return true;
            const nameExtend = getLangObject(langObject, langName, "extend", item.name);
            if (nameExtend.toLowerCase().includes(searchLower)) return true;
            for (const descItem of item.desc) {
                const descText = getLangObject(langObject, langName, "object", descItem);
                if (descText.toLowerCase().includes(searchLower)) return true;
                const descTextExtend = getLangObject(langObject, langName, "extend", descItem);
                if (descTextExtend.toLowerCase().includes(searchLower)) return true;
            }
        }
        return false;
    });
}