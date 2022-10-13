import { rest } from 'msw'
import portfolios from './responses/portfolios.json'
import otherPortfolios from './responses/otherPortfolios.json'
import MonthlyReturnsFactory from './factories/MonthlyReturnsFactory'
import { PortfolioDetails } from 'src/@types/Portfolio'

const baseUrl = process.env.REACT_APP_API_PATH

export default [
  rest.get(`${baseUrl}/portfolios`, (_, response, context) => {
    return response(context.status(200), context.json(portfolios))
  }),
  rest.get(`${baseUrl}/portfolios/:id`, (request, response, context) => {
    const id = request.params.id
    const startMonth = Number(request.url.searchParams.get('startMonth'))
    const endMonth = Number(request.url.searchParams.get('endMonth'))
    const portfolio = portfolios.find(({ id: portfolioId }) => portfolioId === id)

    return response(context.status(200), context.json({
      id,
      name: portfolio?.name || '',
      returns: MonthlyReturnsFactory(startMonth, endMonth)
    }))
  }),
  rest.get(`${baseUrl}/other-portfolios`, (request, response, context) => {
    const ids = request.url.searchParams.getAll('ids[]')
    const startMonth = Number(request.url.searchParams.get('startMonth'))
    const endMonth = Number(request.url.searchParams.get('endMonth'))
    const otherPortfoliosDetails: PortfolioDetails[] = otherPortfolios.map(portfolio => ({
      ...portfolio,
      returns: MonthlyReturnsFactory(startMonth, endMonth)
    }))

    if (ids.length <= 0) {
      return response(context.status(200), context.json(otherPortfoliosDetails))
    }

    const filteredPortfolios = otherPortfoliosDetails.filter(({ id }) => ids.includes(id))
    return response(context.status(200), context.json(filteredPortfolios))
  })
]
