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

    if (!this.isDecimalNumber(props.value)) {
      throw new Error("Value must be a decimal");
    }

    this.props = props;
  }

  get value(): number {
    return this.props.value;
  }

  set value(value: number) {
    this.props.value = value;
  }

  get dateHour(): Date {
    return this.props.dateHour;
  }

  set dateHour(dateHour: Date) {
    this.props.dateHour = dateHour;
  }

  isDecimalNumber = (num: number): boolean => {
    const numStr = num.toString();

    return numStr.includes(".");
  };

  getSummary(): TransactionProps {
    return {
      value: this.props.value,
      dateHour: this.props.dateHour,
    };
  }
}
