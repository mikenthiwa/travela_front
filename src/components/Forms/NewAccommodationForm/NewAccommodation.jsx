import React, { PureComponent } from 'react';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import axios from 'axios';
import toast from 'toastr';
import AccommodationAPI from '../../../services/AccommodationAPI';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import { errorMessage } from '../../../helper/toast';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import AccommodationDetails from './FormFieldsets/AccommodationDetails';
import addPhoto from '../../../images/add_photo_alternate_24px.svg';

class NewAccommodation extends PureComponent {
  constructor(props) {
    super(props);
    const { modalType, guestHouse } = this.props;
    const isEdit = modalType === 'edit accommodation';
    const { houseName, location, bathRooms, imageUrl, genderPolicy, rooms
    } = this.getHouseDetails(modalType, guestHouse);
    const defaultRoom = this.defaultRoom(0);
    this.defaultState = {
      values: { houseName, location, bathRooms, image: imageUrl, genderPolicy,
        preview: imageUrl, ...defaultRoom, ...this.populateRoomsDefaultStateValues(rooms)},
      guestHouseCenter: location,
      rooms: isEdit ? guestHouse.rooms : [{}],
      errors: {},
      documentId: isEdit ? guestHouse.rooms.length: 1,
      hasBlankFields: true, loaded: 0, progress: false };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }
  componentDidMount() {
    const { modalType } = this.props;
    if (modalType === 'new model') { this.addRoomOnClick(); } return null;
  }
  componentWillUnmount() {
    const { fetchAccommodation, guestHouse, modalType, initFetchTimelineData } = this.props;
    AccommodationAPI.setToken();
    this.handleFormCancel();
    if (modalType == 'edit accommodation') {
      const cloneStartDate = moment().startOf('month').clone();
      const startDate = cloneStartDate.format('YYYY-MM-DD');
      const endDate = cloneStartDate.endOf('month').format('YYYY-MM-DD');
      initFetchTimelineData(guestHouse.id, startDate, endDate);
    }
    fetchAccommodation();
  }

  getHouseDetails = (modalType, detailsSource) => {
    const houseDetails = {};
    const houseAttribs = ['houseName', 'location', 'bathRooms', 'imageUrl', 'genderPolicy', 'rooms'];
    houseAttribs.map(attrb => {
      if(!(modalType === 'edit accommodation'))
        return houseDetails[attrb] = '';
      return houseDetails[attrb] = detailsSource[attrb];
    });
    return houseDetails;
  };

  populateRoomsDefaultStateValues = rooms => {
    const { modalType } = this.props;
    if (modalType === 'edit accommodation') {
      const stateValues = {};
      rooms.map((room, i) => {
        stateValues[`roomName-${i}`] = room.roomName;
        stateValues[`roomType-${i}`] = room.roomType;
        stateValues[`bedCount-${i}`] = room.bedCount;
      });
      return stateValues;
    } };

  defaultRoom = index => ({
    [`roomName-${index}`]: '',  [`roomType-${index}`]: '',  [`bedCount-${index}`]: ''
  });

  handleImageChange = event => {
    event.preventDefault();
    const reader = new FileReader();
    if (event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        toast.error('Kindly change this image, you can only upload a jpeg or png image');
      } else {
        reader.onloadend = () => {
          this.setState(
            prevState => ({
              values: { ...prevState.values, preview: reader.result, image: file, }
            }), this.validate );
        };reader.readAsDataURL(file);}
    }};

  displayImage = () => {
    const { values, loaded, progress } = this.state;
    return values.preview ? (
      <div className="upload-image">
        <img src={values.preview} alt="ImagePreview" className="imgPre" />
        { progress && <progress className="progress-bar" value={loaded} max="1" /> }
      </div>
    ) : (
      <div className="image-rectangle">
        <img src={addPhoto} alt="ImagePreview" className="add-photo" />
      </div>);};

  handleLocation = event => {
    const { target } = event;
    const options = { types: ['(cities)'] };
    const autocomplete = new google.maps.places.Autocomplete(target, options);
    this.setState({guestHouseCenter:''});
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace().address_components;
      const countryIndex = place.findIndex(addr => addr.types.includes('country'));
      const places = place[0].long_name + ', ' + place[countryIndex].long_name;
      const { values } = this.state;
      this.setState({ values: { ...values, location: places}, guestHouseCenter: places});
    }); };

  handleInputChange = event => {
    const { rooms } = this.state;
    const { target } = event;
    const { name, value, dataset } = target;
    const { parentid } = dataset;
    const check = rooms[parentid];
    if (check) {
      if (name.startsWith('roomName')) {
        rooms[parentid].roomName = value;
      } else if (name.startsWith('bedCount')) {
        rooms[parentid].bedCount = value;}
    } else { rooms.push({ [name.split('-')[0]]: value });}
    this.setState(prevState => ({
      values: { ...prevState.values, [rooms]: value } }), this.validate);
  };

  handleDropDown = (data, choice) => {
    const { rooms } = this.state;
    const { name, parentid } = data;
    if (rooms[parentid]) {
      if (name.startsWith('roomType')) {
        rooms[parentid].roomType = choice;
      } else {
        rooms.push({ [name.split('-')[0]]: choice });}
      this.setState(prevState => ({
        values: { ...prevState.values, [rooms]: choice } }), this.validate);
    } else {
      this.setState(prevState => ({
        values: { ...prevState.values } }), this.validate);
    }
  };
  handleFormCancel = () => {
    this.setState({ ...this.defaultState });
    let { closeModal } = this.props;
    closeModal(true, 'add accommodation');
  };
  handleEditFormCancel = () => {
    let { closeModal } = this.props;
    closeModal(true, 'edit accommodation');
  };
  addRoomOnClick = () => {
    return this.setState(prevState => {
      const { documentId, values, rooms } = prevState;
      const addNewRoom = this.defaultRoom(documentId);
      return {documentId: documentId + 1, values: { ...values, ...addNewRoom },
        rooms: rooms.concat([{}])
      };
    }, this.validate); };
  removeRoom = i => {
    const roomsProps = ['roomName', 'roomType', 'bedCount'];
    this.setState(prevState => {
      let { documentId, rooms, values, errors } = prevState;
      rooms.splice(i, 1); documentId--;
      roomsProps.map(prop => {
        let start = i;
        while (start < documentId) {
          values[`${prop}-${start}`] = values[`${prop}-${start + 1}`]; start++; }
        delete values[`${prop}-${documentId}`];
        delete errors[`${prop}-${i}`];
      });
      return { rooms, values, documentId, errors }; }, this.validate);
  };
  handleInputSubmit = async event => {
    event.preventDefault();
    this.setState({ hasBlankFields: true });
    const {
      createAccommodation,
      editAccommodation,
      guestHouse,
      modalType,
      savingAccommodation } = this.props;
    savingAccommodation(true);
    const { values, rooms, guestHouseCenter} = this.state;
    const fd = new FormData();
    fd.append('file', values.image);
    fd.append('upload_preset', process.env.REACT_APP_PRESET_NAME);
    const isValid = (values.location === guestHouseCenter);
    let imageUrl;
    if(isValid) {
      try {
        delete axios.defaults.headers.common['Authorization'];
        if(typeof values.image !== 'string') {
          const imageData = await axios.post(process.env.REACT_APP_CLOUNDINARY_API, fd, {
            onUploadProgress:(e) => {this.setState({loaded: e.loaded/e.total, progress: true});
            }});
          imageUrl = imageData.data.secure_url;
        } else {
          imageUrl = values.image;
        }
      } catch (error) {
        errorMessage('Unable to upload Image');
        this.setState({ hasBlankFields: false});
        savingAccommodation(false);
        AccommodationAPI.setToken();
      }
      AccommodationAPI.setToken();
      const guestHouseData = {
        houseName: values.houseName,
        location: values.location,
        bathRooms: values.bathRooms,
        imageUrl: imageUrl,
        genderPolicy: values.genderPolicy,
        rooms: rooms
      };
      if (this.validate() && modalType === 'edit accommodation') {
        editAccommodation(guestHouse.id, guestHouseData);
      } else {
        createAccommodation(guestHouseData);
      }
    } else {
      errorMessage('The location you provided does not exist');
      savingAccommodation(false);
      return this.state;
    }
  };
  render() {
    const { values, errors, hasBlankFields, documentId, rooms } = this.state;
    const currentHasBlankFields = (rooms.length !== 0) ? hasBlankFields : !hasBlankFields;
    const { modalType, isSaving } = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        <form onSubmit={this.handleInputSubmit} className="new-guesthouse">
          <AccommodationDetails
            values={values} handleDropDown={this.handleDropDown}
            displayImage={this.displayImage} addRoomOnClick={this.addRoomOnClick}
            removeRoom={this.removeRoom} handleImageChange={this.handleImageChange}
            handleInputChange={this.handleInputChange} documentId={documentId}
            handleLocation={this.handleLocation}
            modalType={modalType} />
          <Script url={process.env.REACT_APP_CITY} />
          <hr />
          <SubmitArea
            onCancel={this.handleFormCancel}
            onEditCancel={this.handleEditFormCancel}
            hasBlankFields={currentHasBlankFields}
            send={modalType === 'edit accommodation' ? 'Save changes' : 'Save'}
            modalType={modalType}
            loading={isSaving} />
        </form>
      </FormContext>
    );
  }
}
NewAccommodation.propTypes = {
  createAccommodation: PropTypes.func,
  fetchAccommodation: PropTypes.func.isRequired,
  initFetchTimelineData: PropTypes.func.isRequired,
  guestHouse: PropTypes.object.isRequired,
  modalType: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  editAccommodation: PropTypes.func,
  isSaving: PropTypes.bool,
};

NewAccommodation.defaultProps = {
  editAccommodation: () => {},
  createAccommodation: () => {},
  isSaving: false
};
export default NewAccommodation;
