import express from "express";
const sendErrorDev = (err: any, res: express.Response) => {};
const globalError = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log("ssssss", err.statusCode);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  err.correlationId = req.headers["x-correlation-id"];
  res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    errors: err.errors,
    message: err.message,
    correlationId: err.correlationId,
    stack: err.stack,
  });
};

export { globalError };
