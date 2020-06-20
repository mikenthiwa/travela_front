export default (target, index) => {
  const currentTarget = document.getElementsByName(target)[index];
  const dropdown = document.getElementsByClassName('pac-container');
  if (currentTarget && dropdown.length) {
    const height = currentTarget.offsetHeight;
    const originYCord = currentTarget.getBoundingClientRect().y;
    for(let x = 0; x < dropdown.length; x += 1) {
      dropdown[x].style.top = `${originYCord + height}px`;
    }
  }
};
