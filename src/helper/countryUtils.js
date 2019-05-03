import { lookup } from 'country-data';
import placeholderFlag from './placeholderFlag/placeholderFlag.svg';

class countryUtils {
  static getCountryCode(country) {
    const countryCode = lookup.countries({name: country})[0];
    return countryCode;
  }

  static getCountryFlagUrl(location) {
    const country = location.split(', ')[1] ? location.split(', ')[1] : location;
    const countryCode = this.getCountryCode(country);
    return countryCode ? `https://www.countryflags.io/${countryCode.alpha2}/flat/64.png` : placeholderFlag;
  }
}
export default countryUtils;
