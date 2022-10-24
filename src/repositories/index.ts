import { AxiosResponse } from 'axios'
import axiosInstance from '../plugins/axios'
import { Portfolio, PortfolioDetails } from '../types/Portfolio'

export const getSriPortfolios = (): Promise<AxiosResponse<Portfolio[], any>> =>
  axiosInstance.get('/portfolios')

export const getSriPortfolioDetails = (id: string, startMonth: number, endMonth: number): Promise<AxiosResponse<PortfolioDetails, any>> =>
  axiosInstance.get(`/portfolios/${id}`, { params: { startMonth, endMonth }})

export const getOtherPortfolios = (ids: string[], startMonth: number, endMonth: number): Promise<AxiosResponse<PortfolioDetails[], any>> =>
  axiosInstance.get('/other-portfolios', { params: { ids, startMonth, endMonth }})
