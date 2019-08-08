import React from 'react';
import PropTypes from 'prop-types';
import {Provider} from 'react-redux';
import createMockStore from 'redux-mock-store';
import ErrorBoundary from '../index';


const mockStore = createMockStore([]);
const store = mockStore({

});

const TestComponent = ({ data }) => {
  const { text } = data;
  return (
    <div className="test-component">
      { text.toLowerCase() }
    </div>
  );
};

TestComponent.propTypes = {
  data: PropTypes.object.isRequired
};

describe('ErrorBoundary', () => {

  afterEach(() => {
    store.clearActions();
  });

  const wrapperCreator = (data) => mount(
    <Provider store={store}>
      <ErrorBoundary>
        <TestComponent data={data} />
      </ErrorBoundary>
    </Provider>
  );

  it('should display the children if there is no thrown error', () => {
    const wrapper = wrapperCreator({ text: 'Moses'});

    expect(wrapper.find('.test-component').length).toEqual(1);
  });

  it('should render the error message if the wrapped component crashes', () => {
    const wrapper = wrapperCreator({ });
    expect(wrapper.find('.error-boundary-page').length).toEqual(1);
  });

  it('should show the open slack message once the user copies', () => {
    document.execCommand = jest.fn();
    const wrapper = wrapperCreator({});
    wrapper.find('.error-boundary-message').simulate('click');

    expect(wrapper.find('.travela-send-message').length).toEqual(1);
  });

  it('should restore the copied status once the user opens slack', () => {
    document.execCommand = jest.fn();
    const wrapper = wrapperCreator({});
    wrapper.find('.error-boundary-message').simulate('click');

    wrapper.find('.travela-send-message').find('.slack-channel')
      .find('a').simulate('click');

    expect(wrapper.find('.travela-send-message').length).toEqual(0);
  });

  it('should take the user home when the click on BACK TO SAFETY', () => {
    const wrapper = wrapperCreator({});
    Object.defineProperty(window.location, 'href', {
      writable: true,
    });
    wrapper.find('.error-boundary-footer').find('button').simulate('click');

    expect(window.location.href).toEqual('/home');
  });

  it('should report the crash when the application crashes', () => {
    wrapperCreator({});

    const action = store.getActions()[0];

    expect(action).toMatchObject({
      type: 'REPORT_CRASH',
    });

    expect(action.data.stackTrace.length > 0).toBeTruthy();
    expect(action.data.stackTraceId).toBeDefined();
    expect(action.data.link).toBeDefined();
    expect(action.data.info).toBeDefined();
  });
});
