interface CustomResProps {
  body?: string;
  statusCode?: number;
  error?: string;
}

export class CustomRes {
  private props: CustomResProps;

  constructor(props: CustomResProps) {
    this.props = props;
  }

  ok() {
    return {
      body: this.props.body ?? "There is no body",
      statusCode: this.props.statusCode ?? 200,
      error: this.props.error ?? null,
    };
  }

  created() {
    return {
      body: this.props.body ?? "There is no body",
      statusCode: this.props.statusCode ?? 201,
      error: this.props.error ?? null,
    };
  }

  unprocessableEntity() {
    return {
      body: this.props.body ?? "There is no body",
      statusCode: this.props.statusCode ?? 422,
      error: this.props.error ?? null,
    };
  }

  badRequest() {
    return {
      body: this.props.body ?? "There is no body",
      statusCode: this.props.statusCode ?? 400,
      error: this.props.error ?? null,
    };
  }
}
