import extractText from '../extractText';

describe('extractText() function', () => {
  const file = {
    name: 'travel_ticket.png',
    lastModified:1559000016038,
    size: '275536',
    type: 'image/png',
    webkitRelativePath: ''
  };
  const response = { data: {} };

  it('should return ticket details', async () => {
    global.Tesseract = {
      recognize: jest.fn(() => ({
        progress: jest.fn().mockImplementation(() => Promise.resolve({
          text: `1501 Page Mill Road, tripactions.com
          TrIpACtlons Building 1 support@tripactions.com
          Palo Alto, CA 94304 +1 888-433-8747
          United States
          Record Locator Company Booked By Issue Date
          CNVTAS Andela Meshack Mbuvi Mwikali May 10, 2019
          NBO-KGL DATE: May 18, 2019
          From To Class
          NBO - Nairobi KGL - Kigali ECONOMY (M)
          KGL-NBO DATE: May 26, 2019
          From To Class
          KGL - Kigali EBB - Entebbe ECONOMY (H)
          From To Class
          EBB - Entebbe NBO - Nairobi ECONOMY (M)
          Ticket Information
          Ticket Number Passenger Name Payment Method
          4597359482858 MWIKALI MESHACK MBUVI Andela NBO Staff Travel Card
          CAXXXXXXXXXXXX7163
          RwandAir PRICE SUMMARY Sub Total USD 258.00
          Taxes & Fees USD 190.00
          `
        }))
      }))
    };
    await extractText(file, response);
    const { data } = response;
    expect(data.firstFlightDate).toEqual('May 18, 2019');
    expect(data.returnFlightDate).toEqual('May 26, 2019');
    expect(data.flightTicketNumber).toEqual('');
    expect(data.flightAirline).toEqual('RwandAir');
  });
});
