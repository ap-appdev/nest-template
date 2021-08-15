import * as moment from 'moment/moment';

export function momentWithOffset(date = moment(), utcOffset = null) {
  return moment(date).utcOffset(utcOffset);
}
