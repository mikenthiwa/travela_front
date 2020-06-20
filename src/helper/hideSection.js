const hideSection = (collapse) => {
  if (!collapse) {
    const collapseValue = true;
    const commentTitle = 'Hide Comment';
    return { collapseValue, commentTitle };
  } else {
    const collapseValue = false;
    const commentTitle = 'Add comment';
    return { collapseValue, commentTitle };
  }
};

export default hideSection;
