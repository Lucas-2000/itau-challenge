export interface TransactionProps {
  value: number;
  dateHour: Date;
}

export class Transaction {
  private props: TransactionProps;

  constructor(props: TransactionProps) {
    if (props.dateHour > new Date()) {
      throw new Error("Date Hour must be less than Date Time now");
    }

    this.props = props;
  }

  getValue(): number {
    return this.props.value;
  }

  setValue(value: number): void {
    this.props.value = value;
  }

  getDateHour(): Date {
    return this.props.dateHour;
  }

  setDateHour(dateHour: Date): void {
    this.props.dateHour = dateHour;
  }

  getSummary(): TransactionProps {
    return {
      value: this.props.value,
      dateHour: this.props.dateHour,
    };
  }
}
