export default (file, response) => {
  const { Tesseract } = window;
  const TesseractWorker = Tesseract ? Tesseract.TesseractWorker : null;
  const worker = Tesseract ? new TesseractWorker() : null;
  const getDate = (position, arrayOfDates) => arrayOfDates[position] ? arrayOfDates[position]
    .slice(arrayOfDates[position].indexOf(':') + 2) : '';   
  return worker && worker.recognize(file)
    .progress(() => {})
    .then(
      (result) => {
        const textArray = result.text.split('\n');
        const arrayOfMonths = ['January','February','March','April','May',
          'June','July', 'August','September','October','November','December',
          'Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const arrayOfDates = textArray.filter((sentence) => new RegExp(arrayOfMonths
          .join('|')).test(sentence)) || [];
        const firstFlightDate = getDate(1, arrayOfDates);
        const returnFlightDate = getDate(2, arrayOfDates);
        const ticketNumberArray = textArray.filter(sentence => sentence
          .match(/^[0-9]\d{12}/g)) || '';
        const flightTicketNumber = ticketNumberArray[0] ? ticketNumberArray[0]
          .slice(0, 13) : '';
        const airlineWithPrice = textArray.filter(sentence => sentence
          .includes('PRICE SUMMARY'))[0] || '';
        const flightAirline = airlineWithPrice.slice(0, airlineWithPrice.indexOf('PRICE'))
          .trim() || '';
        response.data = {
          ...response.data,
          ...{firstFlightDate, returnFlightDate, flightTicketNumber, flightAirline}
        };
      }
    );
};
