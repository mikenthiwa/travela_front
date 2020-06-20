import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import { shape } from 'prop-types';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import ConnectedCountries, { Countries } from '../index';


 let wrapper;
 const props = {
  countries :[
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
  ],
  isLoaded: true,
  getCountries: sinon.spy(),
  match: {
    params: {
      regionId: '1002'
    }
  },
  location: {
    search: '',
    pathname: '/settings/travel-region/1002'
  },
  history: {
    push: jest.fn(),
  },
  isLoading: false,
  errors: [],
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  createCountry: jest.fn(),
  isAddingCountry: false,
  meta: {pageCount: 3, currentPage: 1},
  travelRegion: [
    {
      id: 1002,
      region: 'West Africa',
      description: 'Nigeria',
      createdAt: '2019-10-05T09:37:11.170Z',
      updatedAt: '2019-10-05T09:37:11.170Z'
    },
    {
      id: 1001,
      region: 'East Africa',
      description: 'Kenya, Uganda and Rwanda',
      createdAt: '2019-10-05T08:36:11.170Z',
      updatedAt: '2019-10-05T08:36:11.170Z'
    }
  ],
  fetchRegions: sinon.spy(() => Promise.resolve())
};
const initialState = {
  country: {
    fetchCountries: {},
    countryErrors: '',
    isLoading: false,
    countries: [
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
    ],
  },
  modal: {
    shouldOpen: false,
    modalType: null
  },
  travelRegion: {
    fetchRegions: {},
    regionErrors: '',
    isLoading: false,
    regions:[
      {
        id: 1002,
        region: 'West Africa',
        description: 'Nigeria',
        createdAt: '2019-10-05T09:37:11.170Z',
        updatedAt: '2019-10-05T09:37:11.170Z'
      },
      {
        id: 1001,
        region: 'East Africa',
        description: 'Kenya, Uganda and Rwanda',
        createdAt: '2019-10-05T08:36:11.170Z',
        updatedAt: '2019-10-05T08:36:11.170Z'
      }
    ],
  }
};
const mockStore = configureStore([createSagaMiddleware]);
const store = mockStore(initialState);

 describe('<CountriesPage>', () => {
  it('should call `handleAddCountry`', () => {
    wrapper = shallow(< Countries {...props} />)
    const handleAddCountrySpy = jest.spyOn(wrapper.instance(), 'handleAddCountry');
    wrapper.instance().handleAddCountry();
    expect(handleAddCountrySpy).toHaveBeenCalled();
  });

  it('should call `determineHeaderTitle', () => {
    wrapper = shallow(< Countries {...props} />)
    const determineHeaderTitleSpy = jest.spyOn(wrapper.instance(), 'determineHeaderTitle');
    wrapper.instance().determineHeaderTitle('default');
    expect(determineHeaderTitleSpy).toHaveBeenCalled();
  });

  it('should render the countries page without crashing', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedCountries {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should render pagination with countries data', (done) => {
    const newProps = { ...props, };
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedCountries {...newProps} />
        </MemoryRouter>
      </Provider>
    );
    const pagination = wrapper.find('Pagination');
    expect(pagination.length).toBe(1);
    done();
  });

  it('should not render pagination when theres no country data', (done) => {
    const newProps = { ...props, countries: [] };
    wrapper = shallow(<Countries {...newProps} />);
    const pagination = wrapper.find('Pagination');
    expect(pagination.length).toBe(0);
    done();
  });

  it(`renders the country Table with
    the correct number of countries`, () => {
    wrapper = shallow(<Countries {...props} />);
    const CountriesTable = wrapper
      .find('WithLoading')
      .dive()
      .find('CountryTable')
      .dive();
    expect(CountriesTable.find('.table__row').length).toEqual(2);
  });

  it('should set `visibility` prop to `visible` when add new country button is clicked', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedCountries {...{ ...props, shouldOpen: true, modalType: 'new model' }} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });

  it('should render page header', (done) => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedCountries {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('PageHeader').length).toBe(1);
    done();
  });

  it('should call onPageChange with page = 2 when next page button is clicked', () => {
    const router = {
      history: new BrowserRouter().history,
      route: {
        location: {search: '',
        pathname: '/settings/travel-region/1002'},
        match: {
          params: {
            regionId: '1002'
        }},
      },
    };
    
    const createContext = () => ({
      context: { router },
      childContextTypes: { router: shape({}) },
    });
    const wrapper = mount(
      <Countries {...props} />, createContext()
    );
    const pageChange = jest.spyOn(wrapper.instance(), 'onPageChange');
    wrapper.find('#next-button').simulate('click');
    expect(pageChange).toHaveBeenCalledWith(2);
    expect(props.history.push)
      .toHaveBeenCalledWith('/settings/travel-region/1002?page=2');
  });
});
