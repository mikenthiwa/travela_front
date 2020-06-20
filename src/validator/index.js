class Validator {
  static databaseValueValidator(value){
    if (/null|undefined/.test(value)){
      return '';
    }
    else{
      return value;
    }
  }
}

export default Validator;
