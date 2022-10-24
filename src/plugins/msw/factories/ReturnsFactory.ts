import moment from 'moment'
import { Return, ReturnPeriod } from '../../../types/Portfolio'

const ReturnsFactory = (range: string[], period: ReturnPeriod): Return[] => {
    let currentDate = moment().subtract(10, 'years').toDate()
    let endDate = moment().toDate()

    if (range[0] && range[1]) {
        currentDate = new Date(range[0])
        endDate = new Date(range[1])
    }

    const dates: Date[] = []
    const periodMapper: Record<ReturnPeriod, 'days' | 'months' | 'years'> = {
        daily: 'days',
        monthly: 'months',
        yearly: 'years'
    }

    while (currentDate <= endDate) {
        dates.push(moment(currentDate).toDate())
        currentDate = moment(currentDate).add(1, periodMapper[period]).toDate()
    }

    return dates.map(date => ({
        date: date.toString(),
        value: Math.floor((Math.random() * 400000) + 100000)
    }))
}

export default ReturnsFactory