const addOtherReasons = (trip, otherReasons) => {
  if (!trip.travelReasons) {
    otherReasons.push(trip.otherTravelReasons ? trip.otherTravelReasons.trim() : '');
  }
};

const getOtherReasons = (trips) =>  {
  const otherReasons = [];
  for (let i = 0; i < trips.length; i++) {
    addOtherReasons(trips[i], otherReasons);
  }
  return otherReasons;
};

function checkValidOtherReason () {
  const { trips } = this.state;
  const otherReasons = getOtherReasons(trips);
  const invalidReason = otherReasons.find(reason => reason.length <= 7);
  invalidReason ? this.setState({ inValidOtherReason: true })
    : this.setState({ inValidOtherReason: false });
}

function handleReasonsId (reason) {
  const { listTravelReasons } = this.props;
  if (reason === 'Other..') {
    return null;
  } else {
    const foundReason = listTravelReasons.travelReasons.find((travelReason) => {
      return travelReason.title === reason;
    });
    return foundReason.id;
  }
}


function handleReason (reason, tripIndex, other) {
  const fieldName = `reasons-${tripIndex}`;
  const otherfieldName = `otherReasons-${tripIndex}`;
  this.handleReasonsId = handleReasonsId.bind(this);
  this.setState(prevState => {
    const { trips } = prevState;
    if (trips[tripIndex]) {
      if (other) {
        trips[tripIndex].otherTravelReasons = reason;
      } else {
        delete prevState.values[otherfieldName];
        trips[tripIndex].travelReasons = reason ? this.handleReasonsId(reason) : null;
        return {
          ...prevState,
          values: {
            ...prevState.values,
            [fieldName]: reason
          },
          trips
        };
      }
    }
  }, () => {
    this.validate(fieldName);
    checkValidOtherReason.bind(this)();
  });
}

export default handleReason;
