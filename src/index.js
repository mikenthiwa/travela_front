import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import './index.scss';
import App from './views/App';
import registerServiceWorker from './registerServiceWorker';

// Register Google analytics tracking for the application
// and the various events for Google analytics to track.
ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_KEY);
ReactGA.pageview('/home');

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
