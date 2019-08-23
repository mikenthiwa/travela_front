import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class PreviewScale extends Component {
  state = { clickedIndex: 0, clicked: false };

  handleOnclick = index => {
    this.setState({ clickedIndex: index, clicked: true });
  };
  renderScale = values => {
    const { clickedIndex, clicked } = this.state;
    return values.map((value, i) => (
      <div
        className={`scale-rectangle ${
          i === clickedIndex && clicked ? 'blue-bg-color' : 'default-bg-color'
        }`}
        key={Math.random()}
        onClick={() => this.handleOnclick(i)}
        role="button"
        tabIndex={i}
        onKeyPress={(event) => event.preventDefault}
      >
        {value}
      </div>
    ));
  };

  render() {
    const {
      item: {
        configuration: { endsAt }
      }
    } = this.props;
    const value = endsAt || 1;
    let scaleArray = [];
    let i = 1;
    while (i <= value) {
      scaleArray.push(i);
      i++;
    }
    return <div className="scale-box">{this.renderScale(scaleArray)}</div>;
  }
}

PreviewScale.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PreviewScale;
