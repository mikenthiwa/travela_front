import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer from '../../FormsAPI';
import * as formMetadata from '../../FormsMetadata/NewAccommodationForm';
import '../NewAccommodation.scss';
import addMoreRoomIcon from '../../../../images/add.svg';
import deleteRoomIcon from '../../../../images/delete.svg';
import setDropdownLocation from '../../../../scripts/dropdownLocation';

class AccommodationDetails extends Component {

  componentDidMount() {
    const overlay = document.getElementsByClassName('overlay')[0];
    if (overlay) overlay.addEventListener('scroll', this.locationDropdownStick);
  }

  componentWillUnmount() {
    const overlay = document.getElementsByClassName('overlay')[0];
    if (overlay) overlay.removeEventListener('scroll', this.locationDropdownStick);
  }

  locationDropdownStick = () => {
    const dropdown = document.getElementsByClassName('pac-container');
    if (dropdown) setDropdownLocation('location', 0);
  }

  renderAddRoomBtn = () => {
    const { addRoomOnClick } = this.props;
    return (
      <div className="add-more-room-rectangle">
        <div
          className="set-width"
          onClick={addRoomOnClick}
          role="presentation"
          onKeyPress={this.press}
        >
          <img src={addMoreRoomIcon} alt="clicked" className="add-sug-room" />
          <p className="add-another-room">Add a Room</p>
        </div>
      </div>
    );
  };


  renderForms(documentId, handleInputChange, handleDropDown) {
    let roomForm = [];
    for (let i = 0; i < documentId; i++) {
      roomForm.push(
        <div id={i} key={i}>
          {this.renderAddRoom(i, handleInputChange, handleDropDown)}
        </div>
      );
    }
    return roomForm;
  }

  renderAddRoom = (i, handleInputChange, handleDropDown) => {
    const { renderInput } = this.inputRenderer;
    const { removeRoom } = this.props;
    return (
      <div className="add-cancel">
        <div className="room-rectangle">
          <div className="style-input-box" onChange={handleInputChange}>
            <div className="room">
              {renderInput(`roomName-${i}`, 'text', { parentid: i })}
            </div>
            <div className="room">
              {renderInput(`roomType-${i}`, 'dropdown-select', {
                parentid: i,
                handleDropDown,
                className: 'add_room_type',
                size: ''
              })}
            </div>
            <div className="room remove" onChange={handleInputChange}>
              {renderInput(`bedCount-${i}`, 'number', { parentid: i })}
            </div>
            {(
              <img
                src={deleteRoomIcon}
                alt="clicked"
                onClick={() => removeRoom()}
                className="cancel-button"
                role="presentation"
                onKeyPress={this.press}
              />
            )}
          </div>
        </div>
      
      </div>
    );
  };

  renderGuestHouseInput = (renderInput, handleLocation, handleDropDown) => {
    return (
      <div className="input-group reduce-margin">
        <div className="guest-house-input">
          {renderInput('houseName', 'text')}
        </div>
        <div className="guest-house-input" onChange={handleLocation}>
          {renderInput('location', 'text')}
        </div>
        <div className="guest-house-input">
          {renderInput('bathRooms', 'number')}
        </div>
        <div className="guest-house-input">
          {renderInput('genderPolicy', 'dropdown-select', {
            handleDropDown,
            choices: ['Unisex', 'Female', 'Male'],
            size: ''
          })}
        </div>
      </div>
    );
  };

  renderImageDisplay = (displayImage, handleImageChange) => {
    const { modalType } = this.props;
    return (
      <div className="aline-box">
        <label htmlFor="guesthouse-image">
          {displayImage()}
        </label>
        <div className="image-space">
          {modalType === 'edit accomodation' ? (
            <p className="upload">Change guest house image</p>
          ) : (
            <p className="upload">Upload guest house image</p>
          )}
          <div className="upload-btn-wrapper">
            <button type="button" id="myBtn" className="action-btn btn-new-request">
                Upload
            </button>
            <input type="file" name="myfile" onChange={handleImageChange} id="guesthouse-image" />
            <div className="image-type">
                Only *jpg or *png files are allowed
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    this.inputRenderer = new InputRenderer(formMetadata);
    const { renderInput } = this.inputRenderer;
    const {
      handleImageChange,
      displayImage,
      documentId,
      handleInputChange,
      handleLocation,
      handleDropDown,
    } = this.props;
    return (
      <fieldset>
        {this.renderImageDisplay(displayImage, handleImageChange)}
        {this.renderGuestHouseInput(renderInput, handleLocation, handleDropDown)}
        <h4 className="add-rooms">Add Rooms</h4>
        {this.renderForms(documentId, handleInputChange, handleDropDown)}
        {this.renderAddRoomBtn()}
      </fieldset>
    );
  }
}

const handleImageChange = PropTypes.func;
const displayImage = PropTypes.func;
const addRoomOnClick = PropTypes.func;
const handleInputChange = PropTypes.func;
const handleLocation = PropTypes.func;
const removeRoom = PropTypes.func;
const documentId = PropTypes.number;
const handleDropDown = PropTypes.func;
const modalType = PropTypes.string;

AccommodationDetails.propTypes = {
  handleImageChange: handleImageChange.isRequired,
  displayImage: displayImage.isRequired,
  addRoomOnClick: addRoomOnClick.isRequired,
  handleInputChange: handleInputChange.isRequired,
  handleLocation: handleLocation.isRequired,
  removeRoom: removeRoom.isRequired,
  documentId: documentId.isRequired,
  handleDropDown: handleDropDown.isRequired,
  modalType: modalType.isRequired
};

export default AccommodationDetails;
