import { AxiosResponse } from 'axios'
import axiosInstance from '../plugins/axios'
import { Currency, PortfolioDetails, ReturnPeriod } from '../types/Portfolio'

export const getSriPortfolioDetails = (
  id: string, 
  range: [Date, Date] | null, 
  period: ReturnPeriod,
  currency: Currency
): Promise<AxiosResponse<PortfolioDetails, any>> =>
  axiosInstance.get(`/portfolios/${id}`, { params: { range, period, currency }})

export const getBenchmarkPortfolios = (
  ids: string[], 
  range: [Date, Date] | null, 
  period: ReturnPeriod,
  currency: Currency
): Promise<AxiosResponse<PortfolioDetails[], any>> =>
  axiosInstance.get('/other-portfolios', { params: { ids, range, period, currency }})
