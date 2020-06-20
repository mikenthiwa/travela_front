import React from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';

class RadioButton extends React.Component {
  state = {
    checked: false
  };

  componentWillMount = () => {
    const { checked } = this.props;
    this.setState({ checked });
  };

  componentWillReceiveProps(nextProps) {
    const { checked } = nextProps;
    this.setState({ checked });
  }

  handleClick = () => {
    const { value, onChange } = this.props;
    this.setState(
      prevState => ({ checked: !prevState.checked }),
      () => {
        const { checked } = this.state;
        onChange({
          target: {
            ...this.props,
            checked,
            value: checked ? value : null
          }
        });
      }
    );
  };

  render() {
    const { checked } = this.state;
    return (
      <div
        role="presentation"
        className={`input-radio-button ${checked ? 'checked' : ''}`}
        onClick={this.handleClick}
        onKeyDown={() => {}}
      />
    );
  }
}

RadioButton.propTypes = {
  checked: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RadioButton;
