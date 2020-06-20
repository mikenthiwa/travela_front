const getSuffix = (number) => {
  const oneToThree = number % 10;
  const elevenToThirteen = number % 100;
  if (oneToThree == 1 && elevenToThirteen != 11) {
    return `${number}st`;
  }
  if (oneToThree == 2 && elevenToThirteen != 12) {
    return `${number}nd`;
  }
  if (oneToThree == 3 && elevenToThirteen != 13) {
    return `${number}rd`;
  }

  return `${number}th`;
};

const disableInputUndoActions = event => {
  const keysTodisable = [
    //mac
    (event.metaKey || event.ctrlKey) && event.shiftKey && event.key === 'z',
    (event.metaKey || event.ctrlKey) && event.key === 'z' && !event.shiftKey,
    //windows
    event.ctrlKey && event.key === 'y',
  ];

  keysTodisable.forEach(item => item && event.preventDefault());
};

export default { getSuffix, disableInputUndoActions };
