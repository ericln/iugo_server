import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import config from './lib/config';
import errohandling from './lib/middleware/errorHanding';
import timestampController from './controllers/timestamp';
import transactionController from './controllers/transaction';
import transactionStatsController from './controllers/transactionStats';
import scoreController from './controllers/scores';
import leaderboardController from './controllers/leaderboard';
import userDataController from './controllers/userData';
import userLoadController from './controllers/userLoad';

let app = express();
app.use(bodyParser.json());

app.use('/Timestamp', timestampController);
app.use('/Transaction', transactionController);
app.use('/TransactionStats', transactionStatsController);
app.use('/ScorePost', scoreController);
app.use('/LeaderboardGet', leaderboardController);
app.use('/UserSave', userDataController);
app.use('/UserLoad', userLoadController);

app.use(errohandling.expressErrorHandler);


app.listen(config.port);

console.log(`Application started on port: ${config.port}`);

export default app;