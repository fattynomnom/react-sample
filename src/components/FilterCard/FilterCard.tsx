import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { Card, Form, Select, DatePicker } from 'antd'
import { Portfolio, PortfolioDetails, RangeValue } from 'src/@types/Portfolio'

export const FilterCard = (props: {
  sriPortfolios: Portfolio[]
  otherPortfolios: PortfolioDetails[]
  defaultDateRange: RangeValue
  onSriPortfolioSelected: (portfolioId: string, range: RangeValue) => void
  onOtherPortfolioSelected: (portfolioIds: string[], range: RangeValue) => void
  onDateRangeSelected: (sriPortfolioId: string, otherPortfolioIds: string[], range: RangeValue) => void
}) => {
  const [form] = Form.useForm()
  const [selectedSriPortfolioId, setSelectedSriPortfolioId] = useState<string>('')
  const [selectedOtherPortfolioIds, setSelectedOtherPortfolioIds] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<RangeValue>(props.defaultDateRange)

  const disabledDate = (date: Moment) => date.isAfter(moment())

  useEffect(() => {
    console.log(selectedSriPortfolioId)
    props.onSriPortfolioSelected(selectedSriPortfolioId, dateRange)
  }, [selectedSriPortfolioId])

  useEffect(() => {
    props.onOtherPortfolioSelected(selectedOtherPortfolioIds, dateRange)
  }, [selectedOtherPortfolioIds])

  useEffect(() => {
    props.onDateRangeSelected(selectedSriPortfolioId, selectedOtherPortfolioIds, dateRange)
  }, [dateRange])

  useEffect(() => {
    if (props.sriPortfolios.length > 0) {
      setSelectedSriPortfolioId(props.sriPortfolios[0].id)
    }
  }, [props.sriPortfolios])

  return <Card title="Compare returns">
    <Form layout="vertical" form={form}>
      <Form.Item label="StashAway's portfolios">
        <Select
          value={props.sriPortfolios[0]?.id || null}
          onChange={setSelectedSriPortfolioId}
          allowClear={false}
        >
          {
            props.sriPortfolios.map(portfolio => (
              <Select.Option value={portfolio.id}>{portfolio.name}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item label="Compare with">
        <Select
          mode="multiple"
          allowClear
          defaultValue={[]}
          onChange={setSelectedOtherPortfolioIds}
        >
          {
            props.otherPortfolios.map(portfolio => (
              <Select.Option value={portfolio.id}>{portfolio.name}</Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <DatePicker.RangePicker
        picker="month"
        defaultValue={dateRange}
        disabledDate={disabledDate}
        onChange={setDateRange}
        format="MMMM YYYY"
      />
    </Form>
  </Card>
}
