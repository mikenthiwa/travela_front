import Validator from '../index';

describe('Test value validator', ()=>{
  it('returns a blank field if value is null', () =>{
    const value = Validator.databaseValueValidator('null');
    expect(value).toBe('');
  });

  it('returns the the passed value if value is not null or undefined', ()=>{
    const value = Validator.databaseValueValidator('collins');
    expect(value).toBe('collins');
  });

  it('returns a blank field if value is undefined', ()=>{
    const value = Validator.databaseValueValidator('undefined');
    expect(value).toBe('');
  });
});
