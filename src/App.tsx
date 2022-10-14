import { useEffect, useMemo, useState } from 'react'
import moment, { Moment } from 'moment'
import { Skeleton, Row, Col } from 'antd'
import CanvasJS from './lib/CanvasJS/canvasjs.react'
import { Portfolio, PortfolioDetails, RangeValue } from './types/Portfolio.d'
import { getSriPortfolios, getOtherPortfolios, getSriPortfolioDetails } from './repositories'
import { FilterCard } from './components/FilterCard/FilterCard'
import './App.css'
import 'antd/dist/antd.css'

const App = () => {
  const [sriPortfolios, setSriPortfolios] = useState<Portfolio[]>([])
  const [otherPortfolios, setOtherPortfolios] = useState<PortfolioDetails[]>([])
  const [doShowError, setDoShowError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [displayedSriPortfolio, setDisplayedSriPortfolio] = useState<PortfolioDetails | null>(null)
  const [displayedOtherPortfolios, setDisplayedOtherPortfolios] = useState<PortfolioDetails[]>([])
  const defaultDateRange: [Moment, Moment] = [moment().subtract(6, 'months'), moment()]

  const barChartConfig = useMemo(() => ({
    animationEnabled: true,
    theme: 'light1',
    title: { text: '' },
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
        legendText: displayedSriPortfolio?.name || '',
        toolTipContent: `${displayedSriPortfolio?.name || ''}: {y}%`,
        dataPoints: displayedSriPortfolio?.returns?.map(({ month, returnsPercentage }) => ({
          x: new Date(2022, month),
          y: returnsPercentage
        })) || []
      },
      ...displayedOtherPortfolios.map(({ name, returns }) => ({
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
  }), [displayedSriPortfolio, displayedOtherPortfolios])

  const fetchSriPortfolios = () => {
    setIsLoading(true)
    getSriPortfolios()
      .then(({ data }) => {
        if (data.length === 0) {
          setDoShowError(true)
        } else {
          setSriPortfolios(data)
        }
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchOtherPortfolios = () => {
    setIsLoading(true)
    getOtherPortfolios([], defaultDateRange[0].month(), defaultDateRange[1].month())
      .then(({ data }) => {
        if (data.length === 0) {
          setDoShowError(true)
        } else {
          setOtherPortfolios(data)
        }
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchDisplayedSriPortfolio = (portfolioId: string, dateRange: RangeValue) => {
    if (!portfolioId || !dateRange || !dateRange[0] || !dateRange[1]) return

    setIsLoading(true)
    getSriPortfolioDetails(portfolioId, dateRange[0].month(), dateRange[1].month())
      .then(({ data }) => {
        setDisplayedSriPortfolio(data)
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchDisplayedOtherPortfolios = (portfolioIds: string[], dateRange: RangeValue) => {
    if (portfolioIds.length <= 0) {
      setDisplayedOtherPortfolios([])
      return
    }

    if (!dateRange || !dateRange[0] || !dateRange[1]) return

    setIsLoading(true)
    getOtherPortfolios(
      portfolioIds,
      dateRange[0].month(),
      dateRange[1].month()
    )
      .then(({ data }) => {
        setDisplayedOtherPortfolios(data)
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const onDateRangeSelected = (sriPortfolioId: string, otherPortfolioIds: string[], range: RangeValue) => {
    fetchDisplayedSriPortfolio(sriPortfolioId, range)
    fetchDisplayedOtherPortfolios(otherPortfolioIds, range)
  }

  const error = <div>We're experiencing some network issues, please check back again later.</div>
  const chart =
    <Row gutter={[50, 50]}>
      <Col xs={24} lg={16}>
        <CanvasJS.CanvasJSChart options={barChartConfig} />
      </Col>
      <Col xs={24} lg={8}>
        <FilterCard
          sriPortfolios={sriPortfolios}
          otherPortfolios={otherPortfolios}
          defaultDateRange={defaultDateRange}
          onSriPortfolioSelected={fetchDisplayedSriPortfolio}
          onOtherPortfolioSelected={fetchDisplayedOtherPortfolios}
          onDateRangeSelected={onDateRangeSelected}
        />
      </Col>
    </Row>
  const mainComponent = doShowError ? error : chart

  useEffect(() => {
    fetchSriPortfolios()
    fetchOtherPortfolios()
  }, [])

  return (
    <div className='container'>
      <h1>Compare our returns with competitor returns</h1>
      { isLoading ? <Skeleton /> : mainComponent}
    </div>
  )
}

export default App;
