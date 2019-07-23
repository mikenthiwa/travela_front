export default (steps, currentTab) => {
  const newSteps = [...steps];
  newSteps[currentTab - 1];
  newSteps[currentTab];
  return newSteps;
};
  
