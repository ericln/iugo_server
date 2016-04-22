import sinon from 'sinon';
import { expect } from 'chai';
import userScoreRepo from '../../src/db/repos/userScoreRepo';
import LeaderboardService from '../../src/services/LeaderboardService';

describe('LeaderboardService', () => {
  context('UserId', () => {

    before((done) => {
      sinon
        .stub(userScoreRepo, 'getRank')
        .yields(null, {
          userScore: {
            leaderboardId: 1001,
            userId: 2,
            score: 20000
          },
          rank:5
        });

      sinon
        .stub(userScoreRepo, 'topScores')
        .yields(null, [
          {
            userId: 8,
            score: 29982,
            rank: 1
          },
          {
            userId: 2,
            score: 20120,
            rank: 2
          },
          {
            userId: 1,
            score: 20002,
            rank: 3
          }
        ]);

      done();
    });

    const testData = {
      userId: 1,
      leaderboardId: 3,
      offset: 0,
      limit: 5
    };

    it('correct userId return true', (done) => {
      let service = new LeaderboardService();
      service.getLeaderboard(
        testData.userId,
        testData.leaderboardId,
        testData.offset,
        testData.limit,
        (err, result) => {
          expect(result.UserId).to.equal(2)
          expect(result.LeaderboardId).to.equal(1001);
          expect(result.Score).to.equal(20000);
          expect(result.Entries.length).to.equal(3);
          done();
        }
      );
    });
  });
});