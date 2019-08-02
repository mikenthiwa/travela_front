import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class ScaleOptionBuilder extends Component {
  handleItem = value => {
    if (value > 10) return;
    const { handleItems, item } = this.props;
    const newItem = {
      ...item,
      configuration: {
        ...item.configuration,
        endsAt: value
      }
    };
    handleItems(newItem);
  };
  render() {
    const {
      item: {
        configuration: { endsAt }
      }
    } = this.props;
    const value = endsAt || 1;
    return (
      <div className="parent">
        <div className="child-1">
          <div className="combined-shape">Starts at</div>
          <div className="value">1</div>
          <div role="button" className="scale-icon">
            <i className="material-icons scale">expand_less</i>
            <i className="material-icons scale">expand_more</i>
          </div>
        </div>
        <div className="child-1">
          <div className="combined-shape">
            <span>Ends at</span>
          </div>
          <div className="value">{value}</div>
          <div className="scale-icon">
            <i
              className="material-icons scale"
              role="button"
              tabIndex={0}
              onClick={() => this.handleItem(value + 1)}
              onKeyPress={this.handleKeyPress}
              id="increment"
            >
              expand_less
            </i>
            <i
              className="material-icons scale"
              role="button"
              tabIndex={0}
              onClick={() => this.handleItem(value - 1)}
              onKeyPress={this.onClick}
              id="decrement"
            >
              expand_more
            </i>
          </div>
        </div>
      </div>
    );
  }
}

ScaleOptionBuilder.propTypes = {
  item: PropTypes.object.isRequired,
  handleItems: PropTypes.func.isRequired
};

export default ScaleOptionBuilder;
