export type ProjectType = {
  firstName: string
  lastName: string
  cartNumber: string 
  currency: string
  sum: number
}

export type CurrencyDataType = CurrencyType[]

type CurrencyType = {
  id: number
  name: string
  exchangeEuroValue: number
}
