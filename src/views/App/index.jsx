import bugsnag from 'bugsnag-js';
import React, { Component, Fragment } from 'react';
import createPlugin from 'bugsnag-react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import MaintenancePage from '../ErrorPages/Maintenance/Maintenance';
import store from '../../redux/store/store';
import './App.scss';
import Routes from '../../routes/index';
import '../../../node_modules/material-design-lite/material';
import '../../../node_modules/material-design-icons';
import '../../customStyles/toast.scss';
import ErrorBoundary from '../ErrorBoundary';


// Check if the bugsnag API key was configured correctly
// and handle cases where the key was not provided.
/*
import bugsnag from 'bugsnag-js';
import bugsnag from 'bugsnag';
Bugsnag Error: "bugsnag-js" is for browser JavaScript only.
  For node, use the "bugsnag" package.

https://github.com/bugsnag/bugsnag-react/issues/4
https://github.com/bugsnag/bugsnag-js/tree/next/packages/plugin-react
https://github.com/bugsnag/bugsnag-js
*/


let Wrapper = Fragment;

if (process.env.REACT_APP_BUGSNAG_API_KEY) {
  /* istanbul ignore next */
  const bugsnagClient = bugsnag(process.env.REACT_APP_BUGSNAG_API_KEY);
  /* istanbul ignore next */
  let Wrapper = bugsnagClient.use(createPlugin(React));
}

// Calender settings
moment.updateLocale('en', {
  week: {
    dow: 1
  }
});

class App extends Component {
  render() {
    return (
      <Wrapper>
        <div className="App-container">
          {
            process.env.REACT_APP_NODE_ENV === 'maintenance'
              ? (
                <MaintenancePage />
              )
              : (
                <Provider store={store}>
                  <ErrorBoundary>
                    <BrowserRouter>
                      <Routes />
                    </BrowserRouter>
                  </ErrorBoundary>
                </Provider>
              )}
        </div>
      </Wrapper>
    );
  }
}

export default App;
