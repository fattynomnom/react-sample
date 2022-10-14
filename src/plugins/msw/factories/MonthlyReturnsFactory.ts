import { Return } from '../../../types/Portfolio.d'

const MonthlyReturnsFactory = (startMonth: number, endMonth: number): Return[] => {
  const returns: Return[] = []
  for (let month = startMonth; month <= endMonth; month++) {
    returns.push({ month, returnsPercentage: Math.random() * 10 })
  }

  return returns
}

export default MonthlyReturnsFactory