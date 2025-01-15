interface ISale {
    ownedShares: number,
    sharePrice: number,
    method: string,
    shares: number,
    balance: number
}

interface ISaleResponse {
    shares: number,
    value: number,
    balance: number
}