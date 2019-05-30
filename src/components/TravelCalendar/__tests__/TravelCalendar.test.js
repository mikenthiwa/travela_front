import React from 'react';
import moment from 'moment';
import { shallow, mount } from 'enzyme';
import TravelCalendar from '../index';
import mockUser from '../../../mockData/mockUserData';

const props = {
  travelCalendar: {
    travelCalendarError: 'Error mew',
    travelCalendarData: {
      data: [{
        name: 'Barrison Waina',
        department: 'Apprenticeship Department',
        role: 'Product designer',
        picture: '',
        flight: {
          arrival: {
            destination: 'Lagos',
            airline: 'Kenya Airways',
            flightNo: 'KQ5752',
            arrivalTime: '24/10/2018 13:23:33',
            departureTime: '24/10/2018 13:23:33'
          },
          departure: {
            destination: 'Nairobi',
            airline: 'Kenya Airways',
            flightNo: 'KQ5752',
            arrivalTime: '24/10/2018 13:23:33',
            departureTime: '24/10/2018 13:23:33'
          }
        }
      }],
      pagination: {
        pageCount: 2,
        currentPage: 1,
        dataCount: 5,
        limit: 3,
        nextPage: 2,
        prevPage: 0
      }
    }
  },
  history: {
    push: jest.fn()
  },
  fetchCalendarAnalytics: jest.fn(),
  downloadCalendarAnalytics: jest.fn(),
  handleFilterBtn: jest.fn(),
  user: {...mockUser}

};

const filter = `dateFrom=${moment().startOf('month')
  .format('YYYY-MM-DD')}&dateTo=${moment().endOf('month').format('YYYY-MM-DD')}`;


const wrapper = shallow(
  <TravelCalendar {...props} />
);

describe('Travel Calendar', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render Travel Calendar Correctly', async () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('checks that download method is called when button is clicked', () => {
    const btn = wrapper.find('.actions__btn');
    btn.simulate('click');
    expect(props.downloadCalendarAnalytics).toHaveBeenCalled();
    expect(props.downloadCalendarAnalytics).toHaveBeenCalledWith({type: 'file', filter, page: 1});
  });

  it('checks that handle change is invoked', () => {
    wrapper.instance().handleChange('This is a range');
    expect(props.fetchCalendarAnalytics).toHaveBeenCalled();
  });

  it('checks that calendar is rendered when button is clicked', () => {
    const btn = wrapper.find('.action-btn--calender');
    btn.simulate('click');
    expect(wrapper.state().isCalendarOpen).toBe(true);
  });

  it('renders the loader when travel calendar data is being fetched', () => {
    const newProps = {...props, travelCalendar: {
      travelCalendarError: '',
      isLoading: true,
      travelCalendarData: {
        data: [],
        pagination: {}
      }
    },};

    const wrapper = shallow(
      <TravelCalendar {...newProps} />
    );
    expect (wrapper.find('TravelCalendarPlaceholder').length).toEqual(3);
  });

  describe('test handlePagination', () => {
    const wrapper = mount(
      <TravelCalendar {...props} />
    );
    it('should have state remain the same when prevState is 0', () => {
      wrapper.find('#Previous').simulate('click');
      expect(props.fetchCalendarAnalytics).not.toHaveBeenCalled();
      expect(wrapper.state().page).toEqual(1);
    });
    it('should change page in state to nextPage', () => {
      wrapper.find('#Next').simulate('click');
      expect(props.fetchCalendarAnalytics).toHaveBeenCalledWith({type: 'json',history: props.history, filter, page: 2});
      expect(wrapper.state().page).toEqual(2);
    });
    it('should change page in state to prevPage', () => {
      props.fetchCalendarAnalytics.mockReset();
      const newProps = {
        ...props,
        travelCalendar: {
          ...props.travelCalendar,
          travelCalendarData: {
            ...props.travelCalendar.travelCalendarData,
            pagination: {
              ...props.travelCalendar.travelCalendarData.pagination,
              prevPage: 1,
              currentPage: 2,
            }
          }
        }
      };
      wrapper.setProps(newProps, () => {
        wrapper.find('#Previous').simulate('click');
        expect(props.fetchCalendarAnalytics).toHaveBeenCalledWith({type: 'json', history: props.history, filter, page: 1});
      });
    });
  });

  describe('Travel Calendar error', () => {
    it('should render Travel Calendar with error fetching data from the server', () => {
      props.travelCalendar = {
        travelCalendarError: 'Server error please try again',
        travelCalendarData: {
          data: []
        },
      };
      const wrapper = shallow(<TravelCalendar {...props} />);
      expect(wrapper.find('p.dashboard-component__error-text--style')).toHaveLength(1);
    });
  });

});
