import React from 'react';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MutationObserver from 'mutation-observer';
import ConnectedVerificationDetails from '..';
import { initialState, props } from '../__mocks__/data';


global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);
let store;

const setupConnectedComponent = (props, store) => {
  return mount(
    <Provider store={store}>
      <Router>
        <ConnectedVerificationDetails
          {...props}
        />
      </Router>
    </Provider>
  );
};

describe('TEST ConnectedVerificationDetails COMPONENT', () => {

  describe('Test close modal button', () => {
    it('should test the modal close button', () => {
      const wrapperPage = setupConnectedComponent(props, store);
      const wrapperInstance = wrapperPage.find('VerificationDetails').instance();
      const pageButtons = wrapperPage.find('button');
      const pageVerifyButton = pageButtons.at(1);
      pageVerifyButton.simulate('click');
      expect(wrapperInstance.state.modalInvisible).toBe(false);
      const closeButton = wrapperPage.find('.modal-close');
      closeButton.simulate('click');
      expect(wrapperInstance.state.modalInvisible).toBe(true);
    });
  });

  describe('TEST COMPONENT WITH AND WITHOUT REQUESTS', () => {
    it('tests component if request is fetching', () => {
      const state = { ...initialState, requests: { fetchingRequest: true } };
      store = mockStore(state);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper).toMatchSnapshot();
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
      const newState = { ...initialState, attachments: { submissions: [] } };
      store = mockStore(newState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.main-container')).toHaveLength(1);
    });

    it('should tests component with request', () => {
      initialState.requests.requestData.status = 'Open';
      const newState = { ...initialState, attachments: { submissions: [] } };
      store = mockStore(newState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.main-container')).toHaveLength(1);
    });

  });

  describe('Updates after props are received', ()=>{
    let wrapper;
    beforeEach(() => {
      wrapper = setupConnectedComponent(props, store);
    });

    it('renders correctly', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('should test components if props are received', ()=>{
      const instance = wrapper.find('VerificationDetails').instance();
      initialState.approvals.updatedStatus = true;
      initialState.approvals.updatingStatus = false;
      const newState = {...initialState};
      store = mockStore(newState);
      let nextProps = {
        ...props,
        isUpdatedStatus: true,
        isConfirmDialogLoading: false
      };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.state.modalInvisible).toBe(true);
      instance.state.modalInvisible = false;
      nextProps = {
        ...props,
        isUpdatedStatus: false,
        isConfirmDialogLoading: false
      };
      instance.componentWillReceiveProps(nextProps);
      expect(instance.state.modalInvisible).toBe(false);
    });
  });

  describe('TEST COMPONENT FUNCTIONS', () => {
    store = mockStore(initialState);
    const wrapper = setupConnectedComponent(props, store);
    const instance = wrapper.find('VerificationDetails').instance();
    const buttons = wrapper.find('button');
    const button1 = buttons.at(1);
    it('buttons disabled status should be false if request status is Open', () => {
      expect(button1.props().disabled).toBe(false);
    });

    it('should test behavior of approve button', () => {
      expect(instance.state.buttonSelected).toBe('');
      button1.simulate('click');
      expect(instance.state.buttonSelected).toBe('verify');
      expect(instance.state.modalInvisible).toBe(false);
      const verifyButton = wrapper.find('#verify.request.verification-comment-modal__btn');
      verifyButton.simulate('click');
      expect(instance.state.modalInvisible).toBe(false);
    });

    it('should test behaviour of back button', () => {
      const wrapper = setupConnectedComponent(props, store);
      wrapper.find('span[role="presentation"]').simulate('click');
      expect(props.history.goBack).toHaveBeenCalled();
    });



    it('should test behaviour of close button', () => {
      button1.simulate('click');
      expect(instance.state.buttonSelected).toBe('verify');
      expect(instance.state.modalInvisible).toBe(false);
      const closeButton = wrapper.find('.modal-close');
      closeButton.simulate('click');
      expect(instance.state.modalInvisible).toBe(true);
    });
  });

  describe('TEST PLURIZATION', () => {
    it('should pluralize name for approved requests', () => {
      initialState.requests.requestData.name = 'Christopher Moses';
      initialState.requests.requestData.status = 'Verified';
      store = mockStore(initialState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.text--grey').at(7).text()).toEqual('You have verified Christopher Moses\' travel request');
    });
  });

  describe('TEST RENDERING FLIGHT DETAILS', () => {
    it('should render Flight Details', () => {
      const wrapper = setupConnectedComponent(props, store);
      const ticketNumber = wrapper.find('[data-test="ticketNumber"]');
      expect(ticketNumber.length).toBe(1);
    });
  });

  describe('TEST RENDERING TRAVEL CHECKLIST ITEMS', () => {
    it('should display checklist items', () => {
      const wrapper = setupConnectedComponent(props, store);
      const attachmentItem = wrapper.find('.attachment-items');
      expect(attachmentItem.length).toBeGreaterThanOrEqual(1);
    });
  });

  describe('TEST HIDE COMMENTS FUNCTION', () => {
    it('should change displayComments state', () => {
      const wrapper = setupConnectedComponent(props, store);
      const hideCommentButton = wrapper.find('.comment-toggle-button');
      const instance = wrapper.find('VerificationDetails').instance();
      expect(instance.state.displayComments).toBe(true);
      hideCommentButton.at(1).simulate('click');
      expect(instance.state.displayComments).toBe(false);
      hideCommentButton.at(1).simulate('click');
      expect(instance.state.displayComments).toBe(true);
    });
  });
});

