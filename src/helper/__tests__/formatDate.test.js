import formatDate from '../formatDate';

describe('formatdate() function', () => {
  it('should return 25 Feb 2019', () => {
    const result = formatDate('2019-02-25');
    expect(result).toEqual('25 Feb 2019');
  });

  it('should return 25 Feb - 25 Mar 2019', () => {
    const result = formatDate('2019-02-25', '2019-03-25');
    expect(result).toEqual('25 Feb - 25 Mar 2019');
  });

  it('should return 25 Feb 2019 - 25 Mar 2019', () => {
    const result = formatDate('2019-02-25', '2020-03-25');
    expect(result).toEqual('25 Feb 2019 - 25 Mar 2020');
  });
});
