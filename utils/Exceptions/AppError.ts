class AppError extends Error {
  constructor(message: string, statusCode: number, errors: object = {}) {
    super(message);
    console.log(message);

    let status = "unknown_error";
    if (statusCode == 422) status = "validation_error";
    else if (statusCode == 404) {
      status = "not_found";
    } else if (statusCode == 409) {
      status = "invalid_otp";
    } else if (statusCode == 401) {
      status = "unauthenticated";
    } else if (statusCode == 403) {
      status = "unauthorized";
    }

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
