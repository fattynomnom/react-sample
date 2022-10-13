import { AxiosResponse } from "axios";
import axiosInstance from 'src/plugins/axios'
import { Portfolio, PortfolioDetails } from "src/@types/Portfolio";

export default {
  getSriPortfolios: (): Promise<AxiosResponse<Portfolio[], any>> =>
    axiosInstance.get('/portfolios'),

  getSriPortfolioDetails: (id: string, startMonth: number, endMonth: number): Promise<AxiosResponse<PortfolioDetails, any>> =>
    axiosInstance.get(`/portfolios/${id}`, { params: { startMonth, endMonth }}),

  getOtherPortfolios: (ids: string[], startMonth: number, endMonth: number): Promise<AxiosResponse<PortfolioDetails[], any>> =>
    axiosInstance.get('/other-portfolios', { params: { ids, startMonth, endMonth }}),
}
