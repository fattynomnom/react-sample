import { useMemo } from 'react'
import CanvasJS from '../../lib/CanvasJS/canvasjs.react'
import { Currency, PortfolioDetails, ReturnPeriod } from '../../types/Portfolio'

export const BenchmarkChart = (props: {
    period: ReturnPeriod
    currency: Currency
    portfolio: PortfolioDetails | null
    benchmarkPortfolio: PortfolioDetails | null
}) => {
    const {
      period,
      currency,
      portfolio,
      benchmarkPortfolio
    } = props

    const intervalTypeMapper: Record<ReturnPeriod, 'day' | 'month' | 'year'> = {
      daily: 'day',
      monthly: 'month',
      yearly: 'year'
    }

    const formatMapper: Record<ReturnPeriod, 'DD MMM' | 'MMMM' | 'YYYY'> = {
      daily: 'DD MMM',
      monthly: 'MMMM',
      yearly: 'YYYY'
    }

    const barChartConfig = useMemo(() => ({
      animationEnabled: true,
      theme: 'dark2',
      title: { text: '' },
      backgroundColor: '#072340',
      axisY: { title: '', suffix: currency },
      axisX: {
        title: '',
        interval: 1,
        intervalType: intervalTypeMapper[period],
        valueFormatString: formatMapper[period]
      },
      data: [
        {
          type: 'line',
          legendText: portfolio?.name || '',
          toolTipContent: `${portfolio?.name || ''}: {y}%`,
          lineColor: '#3B82F6',
          markerColor: 'transparent',
          dataPoints: portfolio?.returns?.map(({ date, value }) => ({
            x: new Date(date),
            y: value
          })) || []
        },
        (!!benchmarkPortfolio && {
          type: 'line',
          legendText: benchmarkPortfolio.name,
          toolTipContent: `${benchmarkPortfolio.name}: {y}%`,
          lineColor: '#FFC35D',
          markerColor: 'transparent',
          dataPoints: benchmarkPortfolio.returns.map(({ date, value }) => ({
            x: new Date(date),
            y: value
          }))
        })
      ]
    }), [portfolio, benchmarkPortfolio])

    return (
      <div className='bg-dark-blue rounded p-10 space-y-10'>
        <div>
          <h1 className='text-xl text-white font-bold'>
            Portfolio value based on gross returns
          </h1>
          <div className='text-white'>
            Gross returns and exchange rates sourced from Bloomberg as of 2nd May 2019
          </div>
        </div>
        <CanvasJS.CanvasJSChart options={barChartConfig} />
        <div className='grid gap-7 grid-cols-4'>
          <div className='col-start-2 flex space-x-4 items-center'>
            <div className='w-5 h-[2px] bg-turquoise' />
            <span className='text-white'>
              { portfolio?.name || '' }
            </span>
          </div>
          <div className='flex space-x-4 items-center'>
            <div className='w-5 h-[2px] bg-orange' />
            <span className='text-white'>
              { benchmarkPortfolio?.name || '' }
            </span>
          </div>
        </div>
      </div>
    )
}
