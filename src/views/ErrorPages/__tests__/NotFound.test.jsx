import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import NotFound from '../index';

const initialState = {
  postAccommodationData: [],
  errors: [],
  modal: {
    shouldOpen: false,
    modalType: null
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);
describe('<NotFound />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </Provider>
    );
  });
  it('should always render properly when only accessing wrong route',() => {
    expect(wrapper.find('.pageOverlay').length).toBe(1);
    expect(wrapper.find('.pageOverlay a.button')).toHaveLength(1);
    expect(wrapper.find('p')).toHaveLength(1);
    expect(wrapper.find('p')
      .at(0).text())
      .toContain('The page you are looking for might have been removed');
    expect(wrapper.find('p')
      .at(0)
      .text())
      .toContain('had its name changed or is temporarily unavailable');
  });
  it('should always redirect to `/requests` by default when the button is clicked', () => {
    expect(wrapper
      .find('.pageOverlay a.button')
      .prop('href')).toEqual('/requests');
  });
  it(`should always redirect to previous page if 'redirectLink'
   is passed as a prop when the button is clicked`, () => {

    const props = { redirectLink: '/requests/my-approvals' };
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <NotFound {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper
      .find('.pageOverlay a.button')
      .prop('href')).toEqual('/requests/my-approvals');
  });
});
