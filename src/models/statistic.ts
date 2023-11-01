export interface StatisticProps {
  count: number;
  sum: number;
  avg: number;
  min: number;
  max: number;
}

export class Statistic {
  private props: StatisticProps;

  constructor(props: StatisticProps) {
    this.props = props;
  }

  get count(): number {
    return this.props.count;
  }

  set count(count: number) {
    this.props.count = count;
  }

  get sum(): number {
    return this.sum;
  }

  set sum(value: number) {
    this.sum = value;
  }

  get avg(): number {
    return this.avg;
  }

  set avg(value: number) {
    this.avg = value;
  }

  get min(): number {
    return this.min;
  }

  set min(value: number) {
    this.min = value;
  }

  get max(): number {
    return this.max;
  }

  set max(value: number) {
    this.max = value;
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
}
