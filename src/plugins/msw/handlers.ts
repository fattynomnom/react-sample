import { rest } from 'msw'
import otherPortfolios from './responses/otherPortfolios.json'
import ReturnsFactory from './factories/ReturnsFactory'
import { Currency, PortfolioDetails, ReturnPeriod } from '../../types/Portfolio.d'

const baseUrl = process.env.REACT_APP_API_PATH

const handlers = [
  rest.get(`${baseUrl}/portfolios/:id`, (request, response, context) => {
    const id = request.params.id
    const range = request.url.searchParams.getAll('range[]')
    const period = request.url.searchParams.get('period') as ReturnPeriod
    const currency = request.url.searchParams.get('currency') as Currency

    return response(context.status(200), context.json({
      id,
      name: 'StashAway Risk Index 14%',
      returns: ReturnsFactory(range, period, currency)
    }))
  }),

  rest.get(`${baseUrl}/other-portfolios`, (request, response, context) => {
    const ids = request.url.searchParams.getAll('ids[]')
    const range = request.url.searchParams.getAll('range[]')
    const period = request.url.searchParams.get('period') as ReturnPeriod
    const currency = request.url.searchParams.get('currency') as Currency
    const otherPortfoliosDetails: PortfolioDetails[] = otherPortfolios.map(portfolio => ({
      ...portfolio,
      returns: ReturnsFactory(range, period, currency)
    }))

    if (ids.length <= 0) {
      return response(context.status(200), context.json(otherPortfoliosDetails))
    }

    const filteredPortfolios = otherPortfoliosDetails.filter(({ id }) => ids.includes(id))
    return response(context.status(200), context.json(filteredPortfolios))
  })
]

export default handlers
