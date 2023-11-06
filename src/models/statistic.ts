export interface StatisticProps {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
}

export class Statistic {
  private props: StatisticProps;

  constructor() {
    this.props = {
      count: 0,
      sum: 0,
      avg: 0,
      min: Number.MAX_VALUE,
      max: Number.MIN_VALUE,
    };
  }

  addTransaction(transactionValue: number) {
    this.props.count++;
    this.props.sum += transactionValue;
    this.props.avg = this.props.sum / this.props.count;
    this.props.min = Math.min(this.props.min, transactionValue);
    this.props.max = Math.max(this.props.max, transactionValue);
  }

  getSummary(): StatisticProps {
    return {
      count: this.props.count,
      sum: this.props.sum,
      avg: this.props.avg,
      min: this.props.min,
      max: this.props.max,
    };
  }

  reset() {
    this.props = {
      count: 0,
      sum: 0,
      avg: 0,
      min: Number.MAX_VALUE,
      max: Number.MIN_VALUE,
    };
  }
}
