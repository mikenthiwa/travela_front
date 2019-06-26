import React from 'react';
import PropTypes from 'prop-types';
import './SelectionMenu.scss';

class SelectionMenu extends React.Component {
  state = { itemSelected: false, selectedId: '', itemData: {} };

  handleSelectItem = (id, data ) => {
    this.setState({ itemSelected: true, selectedId: id, itemData: data});
  };

  handleItemSubmit = () => {
    const { handleSubmit } = this.props;
    const { selectedId, itemData } = this.state;
    const item = { selectedId, itemData } ;
    handleSubmit(item);
  }

  renderItem = item => {
    const { id, data, data:{ cloudinaryUrl, itemName}} = item;
    const { itemSelected, selectedId } = this.state;
    return (
      <div 
        key={id}
        role="presentation"
        className={`menu-item ${itemSelected && selectedId===id ? 'selected' : ''}`}
        onClick={() => this.handleSelectItem(id, data)}
        onKeyDown={() => this.handleSelectItem()}
      >
        {cloudinaryUrl && (
          <img
            src={cloudinaryUrl}
            alt="file"
          />
        )}
        <p>{itemName}</p>
      </div>
    );
  };

  renderSubmitButton = () => {
    const { itemSelected } = this.state;
    return (
      <div className="submit-button">
        <button
          className="bg-btn"
          type="submit"
          disabled={!itemSelected}
          onClick={() => {this.handleItemSubmit();}}
        >
            Submit
        </button>
      </div>
    );
  }

  render() {
    const { dataArray } = this.props;
    return (
      <div className="menu">
        {dataArray.map(item => this.renderItem(item))}
        {this.renderSubmitButton()}
      </div>
    );
  }
}

SelectionMenu.propTypes = {
  dataArray: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SelectionMenu;
