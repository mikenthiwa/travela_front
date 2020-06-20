function handleEditForm () {
  const { requestOnEdit } = this.props;
  const event = {
    target: {
      value: requestOnEdit.tripType
    }
  };
  this.handleRadioButton(event);
}

export default handleEditForm;
