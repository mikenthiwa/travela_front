import hideSection from '../../../../helper/hideSection';

export function showComments () {
  const { collapse } = this.state;
  const { collapseValue, commentTitle } = hideSection(collapse);
  this.setState({
    collapse: collapseValue,
    commentTitle: commentTitle,
  });
}

export function handleComment (commentText)  {
  this.setState(prevState => {
    const { comments } = prevState;
    if (commentText) {
      comments.comment = commentText;
    }
  });
}
