import { AxiosResponse } from 'axios'
import axiosInstance from '../plugins/axios'
import { PortfolioDetails, ReturnPeriod } from '../types/Portfolio'

export const getSriPortfolioDetails = (id: string, range: [Date, Date] | null, period: ReturnPeriod): Promise<AxiosResponse<PortfolioDetails, any>> =>
  axiosInstance.get(`/portfolios/${id}`, { params: { range, period }})

export const getBenchmarkPortfolios = (ids: string[], range: [Date, Date] | null, period: ReturnPeriod): Promise<AxiosResponse<PortfolioDetails[], any>> =>
  axiosInstance.get('/other-portfolios', { params: { ids, range, period }})
