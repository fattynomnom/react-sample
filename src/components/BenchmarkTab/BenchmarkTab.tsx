import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { Skeleton, Stack } from '@chakra-ui/react'
import { Portfolio, PortfolioDetails, RangeValue } from '../../types/Portfolio.d'
import { PeriodOption, PeriodValue } from '../BenchmarkFilterCard/types'
import { getSriPortfolios, getOtherPortfolios, getSriPortfolioDetails } from '../../repositories'
import { BenchmarkFilterCard } from '../BenchmarkFilterCard/BenchmarkFilterCard'
import { BenchmarkChart } from '../BenchmarkChart/BenchmarkChart'

export const BenchmarkTab = () => {
  const periodOptions: PeriodOption[] = [
    { title: '1 month', range: [moment().subtract(1, 'months').startOf('day').toDate(), moment().startOf('day').toDate()] },
    { title: '6 months', range: [moment().subtract(6, 'months').startOf('day').toDate(), moment().startOf('day').toDate()] },
    { title: 'Year to date', range: [moment().startOf('year').startOf('day').toDate(), moment().startOf('day').toDate()] },
    { title: '1 year', range: [moment().subtract(1, 'years').startOf('day').toDate(), moment().startOf('day').toDate()] },
    { title: '5 years', range: [moment().subtract(5, 'years').startOf('day').toDate(), moment().startOf('day').toDate()] },
    { title: 'Max', range: null },
  ]
  const currencies: string[] = ['SGD', 'USD']

  const [sriPortfolios, setSriPortfolios] = useState<Portfolio[]>([])
  const [otherPortfolios, setOtherPortfolios] = useState<PortfolioDetails[]>([])
  const [doShowError, setDoShowError] = useState<boolean>(false)
  const [displayedSriPortfolio, setDisplayedSriPortfolio] = useState<PortfolioDetails | null>(null)
  const [displayedOtherPortfolios, setDisplayedOtherPortfolios] = useState<PortfolioDetails[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodValue>(periodOptions[0].range)
  const [selectedBenchmarkPortfolioId, setSelectedBenchmarkPortfolioId] = useState<string>()
  const [selectedCurrency, setSelectedCurrency] = useState<string>(currencies[0])
  const defaultDateRange: [Moment, Moment] = [moment().subtract(6, 'months'), moment()]

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
    // getSriPortfolioDetails(portfolioId, dateRange[0].month(), dateRange[1].month())
    getSriPortfolioDetails(portfolioId, 1, 12)
      .then(({ data }) => {
        setDisplayedSriPortfolio(data)
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchDisplayedBenchmarkPortfolios = () => {
    if (!selectedBenchmarkPortfolioId) return
    // todo: handle if period is null (max)
    if (!selectedPeriod) return

    setIsLoading(true)
    // todo: do not use start/end month anymore
    getOtherPortfolios(
      [selectedBenchmarkPortfolioId],
      1,
      12
    )
      .then(({ data }) => {
        setDisplayedOtherPortfolios(data)
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchSriPortfolios()
    fetchOtherPortfolios()
  }, [])

  useEffect(() => {
    fetchDisplayedBenchmarkPortfolios()
  }, [selectedBenchmarkPortfolioId])

  useEffect(() => {
    // todo: do not use constants
    // todo: add currency to api
    fetchDisplayedSriPortfolio('1', selectedPeriod)
    fetchDisplayedBenchmarkPortfolios()
  }, [selectedPeriod, selectedCurrency])

  const skeleton = (
    <Stack>
      <Skeleton height='20px' />
      <Skeleton height='20px' />
      <Skeleton height='20px' />
    </Stack>
  )
  const error = <div>We're experiencing some network issues, please check back again later.</div>
  const chart = (
    <div className='space-y-3'>
      <BenchmarkFilterCard
        portfolioName='StashAway Risk Index 14%'
        benchmarkPortfolios={otherPortfolios}
        periodOptions={periodOptions}
        selectedPeriod={selectedPeriod}
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onBenchmarkPortfolioSelected={setSelectedBenchmarkPortfolioId}
        onPeriodSelected={setSelectedPeriod}
        onCurrencySelected={setSelectedCurrency}
      />
      <BenchmarkChart
        portfolio={displayedSriPortfolio}
        benchmarkPortfolios={displayedOtherPortfolios}
      />
    </div>
  )
  const mainComponent = doShowError ? error : chart

  return (
    <div className='space-y-5'>
      <h1 className='text-xl text-blue-900 font-bold'>
        Portfolio benchmark
      </h1>
      { isLoading ? skeleton : mainComponent}
    </div>
  )
}