export default (num, word) => (
  `${num} ${word}${num!== 1 ? 's' : ''}`
);
