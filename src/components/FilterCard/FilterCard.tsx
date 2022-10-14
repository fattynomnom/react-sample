import { useEffect, useState } from 'react'
import moment, { Moment } from 'moment'
import { Card, Form, Select, DatePicker } from 'antd'
import { Portfolio, PortfolioDetails, RangeValue } from '../../types/Portfolio.d'

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

  const onSriPortfolioSelected = (value: string) => {
    setSelectedSriPortfolioId(value)
    props.onSriPortfolioSelected(value, dateRange)
  }

  const onOtherPortfolioSelected = (value: string[]) => {
    setSelectedOtherPortfolioIds(value)
    props.onOtherPortfolioSelected(value, dateRange)
  }

  const onDateRangeSelected = (value: RangeValue) => {
    setDateRange(value)
    props.onDateRangeSelected(selectedSriPortfolioId, selectedOtherPortfolioIds, value)
  }

  useEffect(() => {
    if (props.sriPortfolios.length > 0) {
      onSriPortfolioSelected(props.sriPortfolios[0].id)
    }
  }, [props.sriPortfolios])

  return <Card title="Compare returns">
    <Form layout="vertical" form={form}>
      <Form.Item label="StashAway's portfolios">
        <Select
          value={props.sriPortfolios[0]?.id || null}
          onChange={onSriPortfolioSelected}
          allowClear={false}
        >
          {
            props.sriPortfolios.map(portfolio => (
              <Select.Option
                value={portfolio.id}
                key={portfolio.id}
              >
                {portfolio.name}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item label="Compare with">
        <Select
          mode="multiple"
          allowClear
          defaultValue={[]}
          onChange={onOtherPortfolioSelected}
        >
          {
            props.otherPortfolios.map(portfolio => (
              <Select.Option
                value={portfolio.id}
                key={portfolio.id}
              >
                {portfolio.name}
              </Select.Option>
            ))
          }
        </Select>
      </Form.Item>
      <Form.Item label="Months">
        <DatePicker.RangePicker
          picker="month"
          defaultValue={dateRange}
          disabledDate={disabledDate}
          onChange={onDateRangeSelected}
          format="MMMM YYYY"
          style={{ width: '100%' }}
        />
      </Form.Item>
    </Form>
  </Card>
}
