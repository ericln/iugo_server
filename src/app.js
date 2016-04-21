import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import config from './lib/config';

import timestampController from './controllers/timestamp';
import transactionController from './controllers/transaction';

let app = express();
app.use(bodyParser.json());

app.use('/Timestamp', timestampController);
app.use('/Transaction', transactionController);

app.listen(config.port);

console.log(`Application started on port: ${config.port}`);

export default app;