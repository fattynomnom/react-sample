import { rest } from 'msw'
import otherPortfolios from './responses/otherPortfolios.json'
import ReturnsFactory from './factories/ReturnsFactory'
import { PortfolioDetails, ReturnPeriod } from '../../types/Portfolio.d'

const baseUrl = process.env.REACT_APP_API_PATH

const handlers = [
  rest.get(`${baseUrl}/portfolios/:id`, (request, response, context) => {
    const id = request.params.id
    const range = request.url.searchParams.getAll('range[]')
    const period = request.url.searchParams.get('period') as ReturnPeriod

    return response(context.status(200), context.json({
      id,
      name: 'StashAway Risk Index 14%',
      returns: ReturnsFactory(range, period)
    }))
  }),

  rest.get(`${baseUrl}/other-portfolios`, (request, response, context) => {
    const ids = request.url.searchParams.getAll('ids[]')
    const range = request.url.searchParams.getAll('range[]')
    const period = request.url.searchParams.get('period') as ReturnPeriod
    const otherPortfoliosDetails: PortfolioDetails[] = otherPortfolios.map(portfolio => ({
      ...portfolio,
      returns: ReturnsFactory(range, period)
    }))

    if (ids.length <= 0) {
      return response(context.status(200), context.json(otherPortfoliosDetails))
    }

    const filteredPortfolios = otherPortfoliosDetails.filter(({ id }) => ids.includes(id))
    return response(context.status(200), context.json(filteredPortfolios))
  })
]

export default handlers
