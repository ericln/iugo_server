import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';

import timestampController from './controllers/timestamp';
import transactionController from './controllers/transaction';

let app = express();
app.use(bodyParser.json());

app.use('/Timestamp', timestampController);
app.use('/Transaction', transactionController);

app.listen(8001);

export default app;