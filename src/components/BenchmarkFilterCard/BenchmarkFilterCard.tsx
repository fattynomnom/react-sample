import { ChangeEvent } from 'react'
import { Select } from '@chakra-ui/react'
import { Currency, PortfolioDetails } from '../../types/Portfolio'
import { PeriodOption, PeriodValue } from './types'
import './styles.css'

export const BenchmarkFilterCard = (props: {
  portfolioName: string
  benchmarkPortfolios: PortfolioDetails[]
  periodOptions: PeriodOption[]
  selectedPeriod: PeriodOption
  currencies: Currency[]
  selectedCurrency: string
  onBenchmarkPortfolioSelected: (id: string) => void
  onPeriodSelected: (range: PeriodOption) => void
  onCurrencySelected: (currency: Currency) => void
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
    <div className='space-y-7'>
      <div className='bg-gray-100 rounded overflow-hidden flex flex-col lg:flex-row'>
        <div className='p-7 pb-10 lg:pb-7 space-y-2 flex-1'>
          <div className='text-dark-blue'>
            General investing
          </div>
          <div className='text-blue-500 font-bold text-lg'>
            { portfolioName }
          </div>
        </div>
        <div className='relative p-7 pt-10 lg:pt-7 lg:pl-14 bg-gray-200 flex-1 flex items-center'>
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
          <div className='vs-container'>
            vs
          </div>
        </div>
      </div>

      <div className='flex justify-between'>
        <div className='block lg:hidden'>
          <Select
            defaultValue={periodOptions.findIndex(({ title }) => title === selectedPeriod.title)}
            onChange={(e) => onPeriodSelected(periodOptions[Number(e.target.value)])}
          >
            {
              periodOptions.map((option, index) => (
                <option
                  value={index}
                  key={index}
                >
                  {option.title}
                </option>
              ))
            }
          </Select>
        </div>
        <div className='hidden lg:flex space-x-4'>
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
