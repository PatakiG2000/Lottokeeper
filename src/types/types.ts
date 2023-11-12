export type user = "admin" | "player"

export type Ticket = {
    numbers: number[],
    owner: "player" | "admin"
    luckyHit?: number | undefined
}

export type Statistics = {
    fiveHits: number,
    fourHits: number,
    threeHits: number,
    twoHits: number,
    noHit: number
}