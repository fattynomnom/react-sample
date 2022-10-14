export interface Portfolio {
  id: string
  name: string
}

export interface Return {
  month: number
  returnsPercentage: number
}

export interface PortfolioDetails extends Portfolio {
  returns: Return[]
}

export type RangeValue = [Moment | null, Moment | null] | null
