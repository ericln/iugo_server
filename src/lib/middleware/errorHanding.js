import logger from '../logger';

function expressErrorHandler(err, req, res, next) {
  logger.error(err);

  res.status(err.statusCode || 500).send({
    Error: true,
    ErrorMessage: err.message || err
  });
}


export default {
  expressErrorHandler
}