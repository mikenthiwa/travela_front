import shortId from 'shortid';

export const ChecklistModel = (num) => ({
  id: shortId.generate(),
  order: num + 1,
  prompt: '',
  type: '',
  behaviour: null,
  configuration: {
    options: [OptionModel()]
  }
});

export const OptionModel = () => ({
  id: shortId.generate(),
  name: '',
  behaviour: null
});
