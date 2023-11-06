import { CustomError } from "../utils/error/customError";

export interface TransactionProps {
  value: number;
  dateHour: Date;
}

export class Transaction {
  private props: TransactionProps;

  constructor(props: TransactionProps) {
    if (props.dateHour > new Date()) {
      throw new CustomError(
        "Date Hour must be less than Date Time now",
        "INVALID_HOUR"
      );
    }

    if (!this.isDecimalNumber(props.value)) {
      throw new CustomError("Value must be a decimal", "INVALID_VALUE");
    }

    if (props.value < 0) {
      throw new CustomError("Value must be positive", "INVALID_VALUE");
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
