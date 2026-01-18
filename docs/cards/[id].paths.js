// docs/cards/[card].paths.js
import { readFileSync } from 'node:fs'

export default {
    paths() {
        const cards = JSON.parse(readFileSync('./docs/cardMap.json', 'utf-8'))

        return cards.map(([, card]) => {
            return {
                params: card,
            }
        })
    }
}