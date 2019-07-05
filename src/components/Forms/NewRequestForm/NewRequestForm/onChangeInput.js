function updatePlaces (name, getId, places) {
  const { trips } = this.state;
  if (trips[getId]) {
    if (name.startsWith('destination')) {
      trips[getId].destination = places;
    } else if (name.startsWith('origin')) {
      trips[getId].origin = places;
    }
  } else {
    trips.push({
      [name.split('-')[0]]: places
    });
  }
  this.setState(
    prevState => ({
      values: {
        ...prevState.values,
        [name]: places
      }
    }), () => this.validate('bed-0')
  );
}

function handleSelection (getId) {
  const { selection } = this.state;
  if (selection !== 'oneWay') {
    this.handlePickBed(null, getId, false);
  }
}

function setPlaces (name, getId, places) {
  const { selection } = this.state;
  if (name.startsWith('destination') && selection === 'multi') {
    const targetFieldId = Number(getId) + 1;
    this.setState(
      prevState => {
        const { trips } = prevState;
        const newTrips = [...trips];

        if (targetFieldId < newTrips.length) {
          newTrips[targetFieldId].origin = places;
        }
        return {
          targetFieldId,
          values: {
            ...prevState.values,
            [`origin-${targetFieldId}`]: places
          },
          trips: [...newTrips]
        };
      }
    );
  }
}

function onChangeInput (event) {
  const name = event.target.name;
  const getId = event.target.dataset.parentid;
  const options = {
    types: ['(cities)']
  };
  const autocomplete = new google.maps.places.Autocomplete(
    event.target,
    options
  );
  autocomplete.addListener('place_changed', () => {
    if (autocomplete.getPlace().address_components) {
      const place = autocomplete.getPlace().address_components;
      const countryIndex = place.findIndex(addr =>
        addr.types.includes('country')
      );
      const places = place[0].long_name + ', ' + place[countryIndex].long_name;

      updatePlaces.bind(this)(name, getId, places);

      handleSelection.bind(this)(getId);
      
      setPlaces.bind(this)(name, getId, places);
    }
  });
}

export default onChangeInput;
