function getPersonalDetails (editing, detailsSource) {
  const { userData, userDataUpdate } = this.props;
  const personalDetails = {};
  const personalDetailsAttributes = [
    'name',
    'gender',
    'department',
    'role',
    'manager',
    'location'
  ];
  const userGender = userDataUpdate && userDataUpdate.result
    ? userDataUpdate.result.gender : userData.gender;
  personalDetailsAttributes.map(attrb => {
    if (userData) {
      if (editing)
        return (personalDetails[attrb] = detailsSource[attrb]);
      userData.name = userData.passportName;
      userData.role = userData.occupation;
      userData.gender = userGender;
      let value = userData[attrb];
      value = !/^null|undefined$/.test(value) ? value : '';
      return (personalDetails[attrb] = value);
    }
  });
  return personalDetails;
}

export default getPersonalDetails;
