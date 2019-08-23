import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../../../CheckListWizard/ChecklistWizardPreview/PreviewScaleOption/index.scss';

class ScalePreview extends Component {
  handleOnclick = index => {
    const { handleResponse, item: { id } } = this.props;
    handleResponse({ id, selectedValue: index }); 
  };
  renderScale = values => {
    const { item } = this.props;
    const clickedIndex = item.response && item.response.selectedValue;
    return values.map((value, i) => (
      <div
        className={`scale-rectangle ${
          i === clickedIndex ? 'blue-bg-color' : 'default-bg-color'
        }`}
        key={Math.random()}
        onClick={() => this.handleOnclick(i)}
        role="button"
        tabIndex={i}
        onKeyPress={this.onClick}
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

ScalePreview.propTypes = {
  item: PropTypes.object.isRequired,
  handleResponse: PropTypes.func.isRequired,
};

export default ScalePreview;
