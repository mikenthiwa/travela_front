import React from 'react';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MutationObserver from 'mutation-observer';
import ApproveRequests from '..';
import { initialState, props } from '../__mocks__';

const ConnectedApproveRequests = ApproveRequests();
global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);
let store;

const setupConnectedComponent = (props, store) => {
  return mount(
    <Provider store={store}>
      <Router>
        <ConnectedApproveRequests
          {...props}
        />
      </Router>
    </Provider>
  );
};

describe('TEST ConnectedApproveRequests COMPONENT', () => {

  describe('TEST COMPONENT WITH AND WITHOUT REQUESTS', () => {

    it('should tests component if request is fetching', () => {
      const state = { ...initialState, requests: { fetchingRequest: true } };
      store = mockStore(state);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.spinner')).toHaveLength(1);
    });

    it('should tests component if request does not exist', () => {
      const state = { ...initialState, requests: { fetchingRequest: false } };
      store = mockStore(state);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.error-msg')).toHaveLength(1);
      expect(wrapper.find('.error-msg').text()).toBe('This request does not exist');
    });
  
    it('should tests component with request', () => {
      store = mockStore(initialState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.main-container')).toHaveLength(1);
    });
  });

  describe('TEST COMPONENT METHODS', () => {
    initialState.requests.requestData.stipend = [
      { subTotal: 0, location: 'Nairobi, Kenya', dailyRate: 'N/A', duration: 3, centerExists: true }
    ];
    store = mockStore(initialState);
    const wrapper = setupConnectedComponent(props, store);
    const instance = wrapper.find('ApproveRequests').instance();
    const buttons = wrapper.find('button');
    const button1 = buttons.at(1);
    const button2 = buttons.at(2);

    it('buttons disabled status should be false if request status is Open', () => {
      expect(button1.props().disabled).toBe(false);
      expect(button2.props().disabled).toBe(false);
    });

    it('should test behavior of approve button', () => {
      expect(instance.state.buttonSelected).toBe('');
      button1.simulate('click');
      expect(instance.state.buttonSelected).toBe('approve');
      expect(instance.state.modalInvisible).toBe(false);
      const approveButton = wrapper.find('.approval-comment-modal__btn');
      approveButton.simulate('click');
      expect(instance.state.modalInvisible).toBe(true);
    });

    it('should test behavior of reject button', () => {
      expect(instance.state.buttonSelected).toBe('approve');
      button2.simulate('click');
      expect(instance.state.buttonSelected).toBe('reject');
      expect(instance.state.modalInvisible).toBe(false);
      const rejectButton = wrapper.find('.rejection-comment-modal__btn');
      rejectButton.simulate('click');
      expect(instance.state.modalInvisible).toBe(true);
    });

    it('should test behaviour of back button', () => {
      const wrapper = setupConnectedComponent(props, store);
      wrapper.find('span[role="presentation"]').simulate('click');
      expect(props.history.goBack).toHaveBeenCalled();
    });
  });

  describe('TEST PLURALIZATION', () => {
    it('should pluralize name for approved requests', () => {
      initialState.requests.requestData.name = 'Christopher Moses';
      initialState.requests.requestData.status = 'Approved';
      initialState.requests.requestData.stipend = [
        ...initialState.requests.requestData.stipend,
        { subTotal: 1800, location: 'Lagos, Nigeria', dailyRate: 600, duration: 3, centerExists: true }
      ];
      store = mockStore(initialState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.text--grey').at(6).text()).toEqual('You have approved Christopher Moses\' travel request');
    });

    it('should pluralize name rejected requests', () => {
      initialState.requests.requestData.name = 'Christopher Moses';
      initialState.requests.requestData.status = 'Rejected';
      store = mockStore(initialState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.text--grey').at(6).text()).toEqual('You have rejected Christopher Moses\' travel request');
    });
  });


  describe('TEST TRAVEL STIPEND POP UP MODAL', () => {
    it('should make modal appear', () => {
      store = mockStore(initialState);
      const wrapper = setupConnectedComponent(props, store);
      const button = wrapper.find('button').at(0);
      expect(wrapper.find('.modal')).toHaveLength(0);// check that modal is hidden
      button.simulate('click');
      expect(wrapper.find('.modal')).toHaveLength(1); // check that modal is now visible
      button.simulate('click');
      expect(wrapper.find('.modal')).toHaveLength(0); // check that modal has gone back into hiding
    });
  });
});
