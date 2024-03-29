export interface Portfolio {
  id: string
  name: string
}

export interface Return {
  date: string
  value: number
  currency: Currency
}

export interface PortfolioDetails extends Portfolio {
  returns: Return[]
}

export type ReturnPeriod = 'daily' | 'monthly' | 'yearly'

export type Currency = 'SGD' | 'USD'
