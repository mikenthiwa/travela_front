import React from 'react';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MutationObserver from 'mutation-observer';
import HOCVerificationDetails from '..';
import {initialState, props, noSubmissions, verifiedRequest} from '../__mocks__/data';

const ConnectedVerificationDetails = HOCVerificationDetails();


global.MutationObserver = MutationObserver;
window.document.getSelection = () => {};

const middleware = [];
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
      store = mockStore(initialState);
      const wrapper = setupConnectedComponent(props, store);
      expect(wrapper.find('.main-container')).toHaveLength(1);
    });

    it('should tests component with request', () => {
      initialState.requests.requestData.status = 'Open';
      store = mockStore(initialState);
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
      const instance = wrapper.find('Verifications').instance();
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
      instance.componentDidUpdate(nextProps, nextProps);
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
    const buttons = wrapper.find('button');


    it('should test behaviour of back button', () => {
      const wrapper = setupConnectedComponent(props, store);
      wrapper.find('span[role="presentation"]').simulate('click');
      expect(props.history.goBack).toHaveBeenCalled();
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

  describe('TEST RENDERING TRAVEL CHECKLIST ITEMS', () => {
    it('should display checklist items', () => {
      const wrapper = setupConnectedComponent(props, store);
      const attachmentItem = wrapper.find('.travelCheck-list');
      expect(attachmentItem.length).toBeGreaterThanOrEqual(1);
    });
  });
  
  describe('TEST HIDE COMMENTS FUNCTION', () => {
    it('should change displayComments state', () => {
      const wrapper = setupConnectedComponent(props, store);
      const hideCommentButton = wrapper.find('.comment-toggle-button');
      const instance = wrapper.find('Verifications').instance();
      expect(instance.state.displayComments).toBe(true);
      hideCommentButton.at(1).simulate('click');
      expect(instance.state.displayComments).toBe(false);
      hideCommentButton.at(1).simulate('click');
      expect(instance.state.displayComments).toBe(true);
    });
  });

  describe('TEST FLIGHT DETAILS TAB RENDER', () => {
    it('should display tab ', () => {
      const state = { ...initialState, requests: { fetchingRequest: false } };
      store = mockStore(state);
      const wrapper = setupConnectedComponent(props, store);
      wrapper.find('Tab[title="FLIGHT DETAILS"]').find('div').first().simulate('click');
      const ticketTab = wrapper.find('.travel-cost-header-container');
      expect(ticketTab.length).toBe(1);
    });

    it('should download files when button clicked',() =>{
      const state = { ...initialState, requests: { fetchingRequest: false } };
      store = mockStore(state);
      const wrapper = setupConnectedComponent(props, store);
      wrapper.find('Tab[title="FLIGHT DETAILS"]').find('div').first().simulate('click');
      wrapper.find('Button').find('.uploaded-button');
      const attachment = wrapper.find('button.upload-btn__uploaded');
      attachment.simulate('click');
      expect(store.getActions()).toContainEqual({
        type: 'DOWNLOAD_ATTACHMENTS',
        url:'https://res.cloudinary.com/authors-haven/image/upload/v1561377750/dwbogtwostrvfvghvluh.jpg',
        name: '61b36a8679a3be840e93679c0bf4cbcb (3).jpg' });
    });

    it('should return undefined on checklist submission',() =>{
      const state = { ...initialState, submissions: noSubmissions.submissionInfo, requests: { fetchingRequest: false } };
      store = mockStore(state);
      const wrapper = setupConnectedComponent(noSubmissions, store);
      wrapper.find('.checklist-items');
      const submissions = wrapper.find('.travel-cost-body-container');
      expect(submissions.length).toBeGreaterThanOrEqual(0);
    });

    it('should verify a request upon checklist completion',() =>{
      const state = {
        ...initialState,
        requests: {
          ...verifiedRequest,
          fetchingRequest: false
        } ,
        submissions: {
          ...props.submissionInfo,
          percentageCompleted: 100
        }
      };
      store = mockStore(state);
      const wrapper = setupConnectedComponent({...props, submissionInfo: { ...props.submissionInfo, percentageCompleted: 100}}, store);
      wrapper.find('RightPane').find('button').first().simulate('click');

      wrapper.find('ConfirmDialog').find('button').first().simulate('click');
      const verifications = wrapper.find('Verifications').instance();
      expect(verifications.state.modalInvisible).toBeTruthy();

      wrapper.find('RightPane').find('button').first().simulate('click');
      wrapper.find('ConfirmDialog').find('button#verify').simulate('click');
      expect(store.getActions()).toContainEqual({
        type: 'UPDATE_REQUEST_STATUS',
        statusUpdateData: { requestId: 'nKUGXmTmn', newStatus: 'Verified' }
      });
    });
  });
});

