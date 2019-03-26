export default (steps, currentTab) => {
  const newSteps = [...steps];
  newSteps[currentTab - 1].status = '';
  newSteps[currentTab].status = 'You are currently here';
  return newSteps;
};
