const sendErrorDev = (err, res) => {

  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    errors: err.errors,
    message: err.message,
    correlationId: err.correlationId,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  console.log(err);
  // Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      statusCode: err.statusCode,
      errors: err.errors,
      message: err.message,
    });

  } else {
    // 1) Log error
    console.error('ERROR 💥', err);

    // 2) Send generic message
    res.status(500).json({
      status: 'unknown_error',
      message: 'Something went very wrong!',
    });
  }
};

module.exports = {
  catchError(res, error, code, message) {
    console.log(error);
    res.status(code).json({
      error: message,
    });
  },
  globalError(err, req, res, next) {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    err.correlationId = req.headers['x-correlation-id'];
    if (process.env.NODE_ENV === 'dev') {
      sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'prod') {
      sendErrorProd(err, res);

    }
  },
};
