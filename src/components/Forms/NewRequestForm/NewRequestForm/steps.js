import newSteps from '../../../../helper/newSteps';

export function backStep (e) {
  e.preventDefault();
  const { steps, currentTab, trips } = this.state;
  if (currentTab === 2) {
    this.setState({
      steps: newSteps(steps, currentTab - 1),
      currentTab: currentTab - 1
    });
  }
  if (currentTab !== 2) {
    this.setState({
      steps: newSteps(steps, currentTab - 1),
      currentTab: currentTab - 1
    });
  }
}

export function nextStep (e, travelStipends) {
  e.preventDefault();
  const { steps, currentTab, trips } = this.state;
  if (currentTab === 2) {
    if(trips.length >= 2) {
      trips.forEach((trip, i) => {
        if (i>0){
          trip.departureDate = trip.departureDate || trips[i-1].returnDate;
        }
      });
    }
    this.setState({
      isLoading: true
    }, () => this.validator({ trips }));
  } if (currentTab === 3) {
    this.setState({
      stipendBreakdown: travelStipends.length ? travelStipends : undefined,
      stipend: 0
    });
  } if (currentTab !== 2) {
    this.setState({
      steps: newSteps(steps, currentTab),
      currentTab: currentTab + 1
    });
  }
}
