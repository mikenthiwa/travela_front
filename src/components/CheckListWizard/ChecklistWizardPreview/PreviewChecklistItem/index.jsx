import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEqual } from 'lodash';
import PreviewOptionConfiguration from '../PreviewOptionConfiguration';

class PreviewChecklistItem extends Component {

  orderNumberRef = React.createRef();

  componentDidUpdate (prevProps) {
    const { item } = this.props;
    if (item.id !== prevProps.item.id) this.orderNumberRef.current.classList.add('animate');
  }

  render() {
    const { item, handleSkipToQuestion } = this.props;
    return (
      <div className="single-preview-item">
        <div
          ref={this.orderNumberRef}
          onAnimationEnd={e => e.target.classList.remove('animate')}
          className="preview-order"
        >
          {item.order}
        </div>
        <div>
          <p className="preview-prompt">{item.prompt}</p>
          <PreviewOptionConfiguration
            item={item}
            handleSkipToQuestion={handleSkipToQuestion}
          />          
        </div>
      </div>
    );
  }
}

PreviewChecklistItem.propTypes = {
  handleSkipToQuestion: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default PreviewChecklistItem;
