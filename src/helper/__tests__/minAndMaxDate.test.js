import moment from 'moment';
import {minDate, maxDate} from '../generateMinAndMaxDate';

describe('Min and Max Date', () => {
  it('should return minimum date', (done) => {
    expect(minDate.format('YYYY-MM-DD')).toEqual(moment(new Date(), 'MM-DD-YYYY').add(1,'days').format('YYYY-MM-DD'));
    done();
  });


  it('should return maximum date', (done) => {
    expect(maxDate.format('YYYY-MM-DD')).toEqual(moment(new Date(Date.now()), 'MM-DD-YYYY').format('YYYY-MM-DD'));
    done();
  });
});
