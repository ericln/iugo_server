import moment from 'moment';

class DateTimeService {

  /**
   * return current time in unix timestamp
   */
  getCurrentTimestamp() {
    return {
      Timestamp: moment().unix()
    };
  }
}

export default DateTimeService;