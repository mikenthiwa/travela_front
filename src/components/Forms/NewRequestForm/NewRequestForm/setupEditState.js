const setBedId = (trips) => {
  trips.forEach(eachTrip => {
    if (eachTrip.accommodationType === 'Not Required') {
      eachTrip.bedId = -2;
    } else if (eachTrip.accommodationType === 'Hotel Booking') {
      eachTrip.bedId = -1;
    }
  });
};

function setRequestValues (requestOnEdit) {
  const defaultTripStateValues = this.getDefaultTripStateValues(0);
  const editTripsStateValues = this.props.editing ? this.getTrips(requestOnEdit) : {};
  const requestTrips = this.props.editing ? this.setTrips(requestOnEdit) : [{}];
  return [defaultTripStateValues, editTripsStateValues, requestTrips];
}

function setupEditState () {
  const { editing, requestOnEdit, userData: { location } } = this.props;
  const { trips, tripType } = requestOnEdit;
  if (editing && requestOnEdit && trips.length > 0) {
    setBedId(trips);
    this.handleEditForm();
    const [defaultTripStateValues, editTripsStateValues, requestTrips] = setRequestValues.bind(this)(requestOnEdit);
    const { name, gender, department, role, manager } = this.getPersonalDetails(
      editing,
      requestOnEdit
    );

    const values = {
      name: name,
      gender,
      department,
      role,
      location,
      manager,
      ...defaultTripStateValues,
      ...editTripsStateValues,
    };
    this.setState({
      values,
      selection: tripType,
      trips: requestTrips,
      prevValues: values,
      prevTrips: requestTrips
    }, () => {
      this.checkLowerDate();
      this.checkSameDate();
      this.validate();
    });
  }
}

export default setupEditState;
