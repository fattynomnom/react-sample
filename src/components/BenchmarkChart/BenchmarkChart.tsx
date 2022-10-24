import { useMemo } from 'react'
import CanvasJS from '../../lib/CanvasJS/canvasjs.react'
import { PortfolioDetails } from '../../types/Portfolio'

export const BenchmarkChart = (props: {
    portfolio: PortfolioDetails | null
    benchmarkPortfolios: PortfolioDetails[]
}) => {
    const {
        portfolio,
        benchmarkPortfolios
    } = props

    const barChartConfig = useMemo(() => ({
        animationEnabled: true,
        theme: 'dark2',
        title: { text: '' },
        backgroundColor: '#1e3b8a',
        axisY: { title: '', suffix: '%' },
        axisX: {
          title: '',
          interval: 1,
          intervalType: 'month',
          valueFormatString: 'MMMM'
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
            dataPoints: portfolio?.returns?.map(({ month, returnsPercentage }) => ({
              x: new Date(2022, month),
              y: returnsPercentage
            })) || []
          },
          ...benchmarkPortfolios.map(({ name, returns }) => ({
            type: 'line',
            showInLegend: true,
            legendText: name,
            toolTipContent: `${name}: {y}%`,
            dataPoints: returns.map(({ month, returnsPercentage }) => ({
              x: new Date(2022, month),
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
