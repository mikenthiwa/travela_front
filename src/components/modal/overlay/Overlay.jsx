import React, {Component} from 'react';
import { PropTypes } from 'prop-types';
import './_overlay.scss';

class Overlay extends Component {
  render() {
    const {className, click, children, overlayBackground} = this.props;
    return (
      <div
        role="button"
        tabIndex="0"
        onKeyPress={() => {}}
        onClick={click}
        className={`overlay ${className} ${overlayBackground}`}
      >
        {children}
      </div>
    );
  }
}

Overlay.propTypes = {
  className: PropTypes.string.isRequired,
  overlayBackground: PropTypes.string,
  click: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.object, PropTypes.array
  ]).isRequired,
};

Overlay.defaultProps = {
  click: null,
  overlayBackground: '',
};

export default Overlay;
