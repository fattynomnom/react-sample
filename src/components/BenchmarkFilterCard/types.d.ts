import { ReturnPeriod } from "../../types/Portfolio"

export type PeriodValue = [Date, Date] | null

export interface PeriodOption {
    title: string
    range: PeriodValue
    period: ReturnPeriod
}
