export const ChecklistModel = (num) => ({
  order: num + 1,
  prompt: '',
  type: '',
  configuration: {
    options: [OptionModel()]
  }
});

export const OptionModel = () => ({
  id: Math.random() * 1000000000,
  name: '',
  behaviour: {}
});
