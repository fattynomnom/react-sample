import { useEffect, useState } from 'react'
import { Skeleton, Row, Col } from 'antd'
import moment, { Moment } from 'moment'
import CanvasJS from 'src/lib/CanvasJS/canvasjs.react'
import { Container, Header } from './styles'
import { Portfolio, PortfolioDetails, RangeValue } from 'src/@types/Portfolio'
import { FilterCard } from 'src/components/FilterCard/FilterCard'
import Repository from 'src/repositories'

export const Portfolios = () => {
  const [sriPortfolios, setSriPortfolios] = useState<Portfolio[]>([])
  const [otherPortfolios, setOtherPortfolios] = useState<PortfolioDetails[]>([])
  const [doShowError, setDoShowError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [displayedSriPortfolio, setDisplayedSriPortfolio] = useState<PortfolioDetails | null>(null)
  const [displayedOtherPortfolios, setDisplayedOtherPortfolios] = useState<PortfolioDetails[]>([])
  const defaultDateRange: [Moment, Moment] = [moment().subtract(6, 'months'), moment()]

  const barChartConfig = () => {
    return {
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
      data: [
        {
          type: 'line',
          toolTipContent: '{x}: {y}%',
          dataPoints: displayedSriPortfolio?.returns?.map(({ month, returnsPercentage }) => ({
            x: new Date(2022, month),
            y: returnsPercentage
          })) || []
        },
        ...displayedOtherPortfolios.map(({ returns }) => ({
          type: 'line',
          toolTipContent: '{x}: {y}%',
          dataPoints: returns.map(({ month, returnsPercentage }) => ({
            x: new Date(2022, month),
            y: returnsPercentage
          }))
        }))
      ]
    }
  }

  const fetchSriPortfolios = () => {
    setIsLoading(true)
    Repository.getSriPortfolios()
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
    Repository.getOtherPortfolios([], defaultDateRange[0].month(), defaultDateRange[1].month())
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
    Repository.getSriPortfolioDetails(portfolioId, dateRange[0].month(), dateRange[1].month())
      .then(({ data }) => {
        setDisplayedSriPortfolio(data)
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchDisplayedOtherPortfolios = (portfolioIds: string[], dateRange: RangeValue) => {
    if (portfolioIds.length <= 0 || !dateRange || !dateRange[0] || !dateRange[1]) return

    setIsLoading(true)
    Repository.getOtherPortfolios(
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
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={16}>
        <CanvasJS.CanvasJSChart options={barChartConfig()} />
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

  useEffect(() => {
    fetchSriPortfolios()
    fetchOtherPortfolios()
  }, [])

  return (
    <Container>
      <Header>Compare our returns with competitor returns</Header>
      { isLoading ? <Skeleton /> : (doShowError ? error : chart)}
    </Container>
  )
}
