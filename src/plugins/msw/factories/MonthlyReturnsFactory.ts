import { Return } from "src/@types/Portfolio";

export default (startMonth: number, endMonth: number): Return[] => {
  const returns: Return[] = []
  for (let month = startMonth; month <= endMonth; month++) {
    returns.push({ month, returnsPercentage: Math.random() * 10 })
  }

  return returns
}
