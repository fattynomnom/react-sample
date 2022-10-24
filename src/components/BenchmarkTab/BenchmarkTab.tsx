import { useEffect, useState } from 'react'
import moment from 'moment'
import { Skeleton, Stack } from '@chakra-ui/react'
import { PortfolioDetails } from '../../types/Portfolio.d'
import { PeriodOption } from '../BenchmarkFilterCard/types'
import { getBenchmarkPortfolios, getSriPortfolioDetails } from '../../repositories'
import { BenchmarkFilterCard } from '../BenchmarkFilterCard/BenchmarkFilterCard'
import { BenchmarkChart } from '../BenchmarkChart/BenchmarkChart'

export const BenchmarkTab = () => {
  const periodOptions: PeriodOption[] = [
    { 
      title: '1 month', 
      range: [moment().subtract(1, 'months').startOf('day').toDate(), moment().startOf('day').toDate()],
      period: 'daily'
    },
    { 
      title: '6 months', 
      range: [moment().subtract(6, 'months').startOf('day').toDate(), moment().startOf('day').toDate()],
      period: 'monthly'
    },
    { 
      title: 'Year to date', 
      range: [moment().startOf('year').startOf('day').toDate(), moment().startOf('day').toDate()],
      period: 'monthly'
    },
    { 
      title: '1 year', 
      range: [moment().subtract(1, 'years').startOf('day').toDate(), moment().startOf('day').toDate()],
      period: 'monthly'
    },
    { 
      title: '5 years',
      range: [moment().subtract(5, 'years').startOf('day').toDate(), moment().startOf('day').toDate()],
      period: 'yearly'
    },
    { 
      title: 'Max', 
      range: null, 
      period: 'yearly' 
    }
  ]
  const currencies: string[] = ['SGD', 'USD']

  const [doShowError, setDoShowError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [benchmarkPortfolios, setBenchmarkPortfolios] = useState<PortfolioDetails[]>([])
  const [selectedBenchmarkPortfolio, setSelectedBenchmarkPortfolio] = useState<PortfolioDetails | null>(null)

  const [selectedPortfolio, setSelectedPortfolio] = useState<PortfolioDetails | null>(null)

  const [selectedPeriod, setSelectedPeriod] = useState<PeriodOption>(periodOptions[0])
  const [selectedBenchmarkPortfolioId, setSelectedBenchmarkPortfolioId] = useState<string>()
  const [selectedCurrency, setSelectedCurrency] = useState<string>(currencies[0])

  const fetchAllBenchmarkPortfolios = () => {
    setIsLoading(true)
    getBenchmarkPortfolios([], selectedPeriod.range, selectedPeriod.period)
      .then(({ data }) => {
        if (data.length === 0) {
          setDoShowError(true)
        } else {
          setBenchmarkPortfolios(data)
        }
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchSelectedBenchmarkPortfolio = () => {
    if (!selectedBenchmarkPortfolioId) return

    setIsLoading(true)
    getBenchmarkPortfolios([selectedBenchmarkPortfolioId], selectedPeriod.range, selectedPeriod.period)
      .then(({ data }) => {
        if (data.length === 0) {
          setDoShowError(true)
        } else {
          setSelectedBenchmarkPortfolio(data[0])
        }
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  const fetchPortfolio = () => {
    setIsLoading(true)
    getSriPortfolioDetails('1', selectedPeriod.range, selectedPeriod.period)
      .then(({ data }) => {
        setSelectedPortfolio(data)
      })
      .catch(() => {
        setDoShowError(true)
      })
    setIsLoading(false)
  }

  useEffect(() => {
    fetchPortfolio()
    fetchAllBenchmarkPortfolios()
  }, [])

  useEffect(() => {
    fetchPortfolio()
    fetchSelectedBenchmarkPortfolio()
  }, [selectedBenchmarkPortfolioId, selectedPeriod, selectedCurrency])

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
        portfolioName={selectedPortfolio?.name || ''}
        benchmarkPortfolios={benchmarkPortfolios}
        periodOptions={periodOptions}
        selectedPeriod={selectedPeriod}
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        onBenchmarkPortfolioSelected={setSelectedBenchmarkPortfolioId}
        onPeriodSelected={setSelectedPeriod}
        onCurrencySelected={setSelectedCurrency}
      />
      <BenchmarkChart
        period={selectedPeriod.period}
        portfolio={selectedPortfolio}
        benchmarkPortfolio={selectedBenchmarkPortfolio}
      />
    </div>
  )
  const mainComponent = doShowError ? error : chart

  return (
    <div className='space-y-5'>
      <h1 className='text-xl text-dark-blue font-black'>
        Portfolio benchmark
      </h1>
      { isLoading ? skeleton : mainComponent}
    </div>
  )
}