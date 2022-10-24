import { ChangeEvent } from 'react'
import { Select } from '@chakra-ui/react'
import { PortfolioDetails } from '../../types/Portfolio'
import { PeriodOption, PeriodValue } from './types'
import './styles.css'

export const BenchmarkFilterCard = (props: {
  portfolioName: string
  benchmarkPortfolios: PortfolioDetails[]
  periodOptions: PeriodOption[]
  selectedPeriod: PeriodOption
  currencies: string[]
  selectedCurrency: string
  onBenchmarkPortfolioSelected: (id: string) => void
  onPeriodSelected: (range: PeriodOption) => void
  onCurrencySelected: (currency: string) => void
}) => {
  const {
    portfolioName, 
    benchmarkPortfolios, 
    periodOptions, 
    selectedPeriod, 
    currencies,
    selectedCurrency,
    onBenchmarkPortfolioSelected, 
    onPeriodSelected,
    onCurrencySelected
  } = props

  const changeSelectedBenchmarkPortfolio = (e: ChangeEvent<HTMLSelectElement>): void => {
    onBenchmarkPortfolioSelected(e.target.value)
  }

  const isPeriodSelected = (range: PeriodValue) => (
    range === selectedPeriod.range || range?.every((date, index) => date.toString() === selectedPeriod?.range?.[index]?.toString())
  )

  return (
    <div className='space-y-5'>
      <div className='relative'>
        <div className='bg-gray-100 rounded overflow-hidden flex'>
          <div className='p-7 space-y-2 flex-1'>
            <div className='text-blue-900'>
              General investing
            </div>
            <div className='text-blue-500 text-lg'>
              { portfolioName }
            </div>
          </div>
          <div className='p-7 pl-14 bg-gray-200 flex-1 flex items-center'>
            <Select placeholder='Which benchmark would you like to compare?' onChange={changeSelectedBenchmarkPortfolio}>
              {
                benchmarkPortfolios.map(portfolio => (
                  <option
                    value={portfolio.id}
                    key={portfolio.id}
                  >
                    {portfolio.name}
                  </option>
                ))
              }
            </Select>
          </div>
        </div>
        <div className='vs-container'>
          vs
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='flex'>
          {
            periodOptions.map(option => (
              <button
                key={option.title}
                className={`filter-button ${isPeriodSelected(option.range) && 'selected'}`}
                onClick={() => onPeriodSelected(option)}
              >
                { option.title }
              </button>
            ))
          }
        </div>
        <div className='flex'>
        {
            currencies.map(currency => (
              <button
                key={currency}
                className={`filter-button ${currency === selectedCurrency && 'selected'}`}
                onClick={() => onCurrencySelected(currency)}
              >
                { currency }
              </button>
            ))
          }
        </div>
      </div>
    </div>
  )
}
