import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import morgan from 'morgan';
import config from './lib/config';

import timestampController from './controllers/timestamp';
import transactionController from './controllers/transaction';
import transactionStatsController from './controllers/transactionStats';
import scoreController from './controllers/scores';
import leaderboardController from './controllers/leaderboard';
import userDataController from './controllers/userData';

let app = express();
app.use(bodyParser.json());

app.use('/Timestamp', timestampController);
app.use('/Transaction', transactionController);
app.use('/TransactionStats', transactionStatsController);
app.use('/ScorePost', scoreController);
app.use('/LeaderboardGet', leaderboardController);
app.use('/UserSave', userDataController);



app.listen(config.port);

console.log(`Application started on port: ${config.port}`);

export default app;