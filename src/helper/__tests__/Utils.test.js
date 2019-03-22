import Utils from '../Utils';

describe('Utils Class', () => {
  it('should return true if time have expired', (done) => {
    const expiredDate = new Date('2018-08-31');
    Utils.manageFilterBtnLabel({start: '2018-08-31' , end: '2019-08-31'});
    const expiredDateInSeconds = expiredDate.getTime() * 0.001;
    expect(Utils.isExpired(expiredDateInSeconds)).toBe(true);

    done();
  });


  it('should return `false` if time is not expired', (done) => {
    const time= new Date();
    const timeInSeconds = time.getTime() * 0.001;
    expect(Utils.isExpired(timeInSeconds)).toEqual(false);

    done();
  });
});
