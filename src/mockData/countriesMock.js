export const newCountry = {
  countries : ['abifi', 'asee']
};

const countryData = [
  {
      id: 54,
      country: 'abifi',
      createdAt: '2019-05-17T12:13:02.492Z',
      updatedAt: '2019-05-17T12:13:02.492Z',
      regionId: '1002'
  },
  {
      id: 55,
      country: 'asee',
      createdAt: '2019-05-17T12:13:02.492Z',
      updatedAt: '2019-05-17T12:13:02.492Z',
      regionId: '1002'
  }
];

export const createCountryResponse = {
  data: {
    success: true,
    message: 'Country added successfully',
    countries: countryData
  }
};
export const fetchCountriesResponse = {
  data: {
    success: true,
    message: 'Successfully retrieved countries',
    countries: countryData,
    meta: {
      count: 2,
      pageCount: 1,
      currentPage: 1
  }
  }
};

export const regionId = '1002';
export const query ='';
export const error = 'Possible network error, please reload the page';