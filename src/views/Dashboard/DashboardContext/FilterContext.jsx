import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export const { Consumer, Provider } = React.createContext();

export default class FilterContext extends Component {
  constructor(props) {
    super(props);
    const { user, history } = props;
    const start = moment().startOf('month').format('YYYY-MM-DD');
    const end = moment().endOf('month').format('YYYY-MM-DD');
    const locationUrl = new URLSearchParams(history.location.search);
    const selectedCenter = locationUrl.get('center');
    const center = !selectedCenter ? 'All Locations' : selectedCenter;
    const title = center === 'All Locations' ? '' : `${center} Center`;
    this.state = {
      range: {start, end},
      center,
      title
    };
  }

  handleFilter = filter => {
    this.setState({range: { ...filter }});
  }

  render() {
    const { children } = this.props;
    const context = {
      state: {...this.state},
      handleFilter: this.handleFilter
    };
    return (
      <Provider value={{ ...context }}>
        { children }
      </Provider>
    );
  }
}

FilterContext.propTypes = {
  user: PropTypes.object,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  history: PropTypes.object.isRequired
};

FilterContext.defaultProps = {
  user: {}
};
