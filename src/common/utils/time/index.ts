import * as moment from 'moment/moment';
import { Moment } from 'moment';

export function momentWithOffset(
  date: string | Moment = moment(),
  utcOffset?: string,
): Moment {
  return moment(date).utcOffset(utcOffset || null);
}
