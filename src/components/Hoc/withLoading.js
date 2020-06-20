import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Preloader from '../Preloader/Preloader';

// HOC for adding preloader while a component's data is loading
const withLoading = (ComposedComponent, Placeholder) => {
  class WithLoading extends PureComponent {
    render() {
      const { isLoading } = this.props;
      if (isLoading) {
        return Placeholder ? <Placeholder /> : <Preloader />;
      }
      return (<ComposedComponent {...this.props} />);
    }
  }

  WithLoading.propTypes = {
    isLoading: PropTypes.bool,
  };

  WithLoading.defaultProps = {
    isLoading: false,
  };

  return WithLoading;
};

export default withLoading;
