function errorHandler(err, req, res, next) {
  let statusCode = 500;
  let message = 'Internal server error';

  if (err.name === 'UnauthorizedError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  res.status(statusCode).json({
    error: message
  });
}

export {
  errorHandler
}
