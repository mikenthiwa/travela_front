import React from 'react';
import { mount } from 'enzyme';
import StipendDetails from '../StipendDetails';
import travelStipendHelper from '../../../../../helper/request/RequestUtils';

const trips = [ 
  {
    bedId: 3,
    departureDate: '2019-02-19',
    destination: 'Nairobi, Kenya',
    origin: 'Lagos, Nigeria',
    returnDate: '2019-02-28'
  },
  {
    bedId: 3,
    departureDate: '2019-02-28',
    destination: 'Kampala, Uganda',
    origin: 'Nairobi, Kenya',
    returnDate: '2019-03-29'
  },
  {
    bedId: 3,
    departureDate: '2019-03-29',
    destination: 'UK, London',
    origin: 'Kampala, Uganda',
  }
];

const stipends = [
  {
    'id': 1,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location': 'Lagos, Nigeria'
    }
  },
  {
    'id': 2,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location': 'Nairobi, Kenya'
    }
  },
  {
    'id': 2,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location':'Kampala, Uganda',
    }
  }
];


describe('<StipendDetails />', () => {

  const { totalStipend, stipendSubTotals } = travelStipendHelper
    .getAllTripsStipend(trips, stipends, 'multi'); 

  const props = { 
    isLoading: false,
    stipends,
    total: totalStipend,
    travelStipends: stipendSubTotals
  };

  it('renders without crashing', () => {
    const wrapper = mount(<StipendDetails {...props} />);
    expect(wrapper).toMatchSnapshot();
  });


  it('should show the loader, while stipend is being fetched', () => {
    const newProps = {
      ...props,
      isLoading: true
    };
    const wrapper = mount(<StipendDetails {...newProps} />);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });

  it('should stop showing the loader when stipend is fetched', () =>{
    const wrapper = mount(<StipendDetails {...props} />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });

  it('should render all trips stipend rows', () =>{
    const wrapper = mount(<StipendDetails {...props} />);
    const stipendRows = wrapper.find('.single-trip');
    expect(stipendRows).toHaveLength(3);
    expect(wrapper.find('.stipend-row .item').at(0).text()).toBe('Nairobi(NBO)');
  });

  it('should display stipend for a single to `Nairobi from Lagos`', () =>{
    const newProps = {
      ...props,
      travelStipends: [stipendSubTotals[0]],
      total: Number.parseInt(stipendSubTotals[0].subTotal)
    };
    const wrapper = mount(<StipendDetails {...newProps} />);
    const stipendRows = wrapper.find('.single-trip');
    expect(stipendRows).toHaveLength(1);
    const subTotal = stipendRows.at(0).find('.item').at(3).text().split(' ');
    const dailyRate = stipendRows.at(0).find('.item').at(1).text();
    expect(wrapper.find('.stipend-row .item').at(0).text()).toBe('Nairobi(NBO)');
    expect(dailyRate).toBe('$ 100');
    const total = wrapper.find('.total-stipend').at(0);
    expect(total.text().includes(subTotal[1])).toBe(true);
  });

  it('should display `N/A subTotal and DailyRate for a trip to Non-Andelan center`', () =>{
    const wrapper = mount(<StipendDetails {...props} />);
    const stipendRows = wrapper.find('.single-trip');
    const center = stipendRows.at(2).find('.item').at(0).text();
    const dailyRate = stipendRows.at(2).find('.item').at(1).text();
    const subTotal = stipendRows.at(2).find('.item').at(3).text();
    expect(subTotal).toBe('N/A');
    expect(dailyRate).toBe('N/A');
    expect(center).toBe('UK');
    const total = wrapper.find('.total-stipend').at(0);
    expect(total.text().includes('$ 3800')).toBe(true);
  });

  it('should render correct multi-city trips stipend', () =>{
    const wrapper = mount(<StipendDetails {...props} />);
    const stipendRows = wrapper.find('.single-trip');
    const subTotalOne = stipendRows.at(0).find('.item').at(3).text();
    const subTotalTwo = stipendRows.at(1).find('.item').at(3).text();
    const total = wrapper.find('.total-stipend').at(0);
    expect(subTotalOne).toBe('$ 900');
    expect(subTotalTwo).toBe('$ 2900');
    expect(total.text().includes('$ 3800')).toBe(true);
  });
});
