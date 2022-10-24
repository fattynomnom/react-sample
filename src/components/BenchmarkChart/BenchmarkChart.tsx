import { useMemo } from 'react'
import CanvasJS from '../../lib/CanvasJS/canvasjs.react'
import { PortfolioDetails, ReturnPeriod } from '../../types/Portfolio'

export const BenchmarkChart = (props: {
    period: ReturnPeriod
    portfolio: PortfolioDetails | null
    benchmarkPortfolios: PortfolioDetails[]
}) => {
    const {
      period,
      portfolio,
      benchmarkPortfolios
    } = props

    const intervalTypeMapper: Record<ReturnPeriod, 'day' | 'month' | 'year'> = {
      daily: 'day',
      monthly: 'month',
      yearly: 'year'
    }

    const formatMapper: Record<ReturnPeriod, 'MMMM' | 'YYYY' | undefined> = {
      daily: undefined,
      monthly: 'MMMM',
      yearly: 'YYYY'
    }

    const barChartConfig = useMemo(() => ({
      animationEnabled: true,
      theme: 'dark2',
      title: { text: '' },
      backgroundColor: '#1e3b8a',
      axisY: { title: '', suffix: '%' },
      axisX: {
        title: '',
        interval: 1,
        intervalType: intervalTypeMapper[period],
        valueFormatString: formatMapper[period]
      },
      legend: {
        horizontalAlign: 'left',
        verticalAlign: 'top'
      },
      data: [
        {
          type: 'line',
          showInLegend: true,
          legendText: portfolio?.name || '',
          toolTipContent: `${portfolio?.name || ''}: {y}%`,
          dataPoints: portfolio?.returns?.map(({ date, returnsPercentage }) => ({
            x: new Date(date),
            y: returnsPercentage
          })) || []
        },
        ...benchmarkPortfolios.map(({ name, returns }) => ({
          type: 'line',
          showInLegend: true,
          legendText: name,
          toolTipContent: `${name}: {y}%`,
          dataPoints: returns.map(({ date, returnsPercentage }) => ({
            x: new Date(date),
            y: returnsPercentage
          }))
        }))
      ]
    }), [portfolio, benchmarkPortfolios])

    return (
      <div className='bg-blue-900 rounded p-10'>
        <h1 className='text-xl text-white font-bold'>
          Portfolio value based on gross returns
        </h1>
        <div className='text-white mb-4'>
          Gross returns and exchange rates sourced from Bloomberg as of 2nd May 2019
        </div>
        <CanvasJS.CanvasJSChart options={barChartConfig} />
      </div>
    )
}
