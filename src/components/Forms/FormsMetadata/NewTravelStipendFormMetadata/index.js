import inputLabels from './inputLabels';
import dropdownSelectOptions from './dropdownSelectOptions';

export default (editing) =>  ({
  inputLabels: inputLabels(editing),
  dropdownSelectOptions
});
