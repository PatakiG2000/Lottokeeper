export type User = "admin" | "player"

export type Ticket = {
    numbers: number[]
    owner: "player" | "admin"
    luckyHit?: number | undefined
    id?: string,
    wonAmount?: number
}

export type Statistics = {
    fiveHits: number,
    fiveHitsVictory: number,
    fourHits: number,
    fourHitsVictory: number,
    threeHits: number,
    threeHitsVictory: number,
    twoHits: number,
    twoHitsVictory: number,
    noHit: number,
    amountNeedToBePaid: number,
}