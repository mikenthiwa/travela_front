import Helper from '../helper';

describe('Get suffix function', () => {
  it('should render return the right suffix for the nembers', () => {
    expect(Helper.getSuffix(1)).toEqual('1st');
    expect(Helper.getSuffix(2)).toEqual('2nd');
    expect(Helper.getSuffix(3)).toEqual('3rd');
    expect(Helper.getSuffix(4)).toEqual('4th');
    expect(Helper.getSuffix(11)).toEqual('11th');
    expect(Helper.getSuffix(12)).toEqual('12th');
    expect(Helper.getSuffix(13)).toEqual('13th');
    expect(Helper.getSuffix(22)).toEqual('22nd');
    expect(Helper.getSuffix(25)).toEqual('25th');
  });
});
