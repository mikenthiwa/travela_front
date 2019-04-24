const inputLabels = (editing) => ({
  stipend: {
    label: 'Enter Amount in Dollars ($)'
  },
  center: {
    label: editing ? 'Location' : 'Type the country'
  }
});

export default inputLabels;
