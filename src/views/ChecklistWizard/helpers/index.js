import shortId from 'shortid';

const arrangeChecklistByOrder = (items) => items.sort((a, b) => a.order - b.order);

const reorderItems = (items) => {
  if (items.length) {
    items[0].order = 1;
  }

  for (let i = 1; i < items.length; i++){
    if(items[i].order - 1 !== items[i - 1].order){
      items[i].order = items[i - 1].order + 1;
    } 
  }

  return items;
};

export default {
  arrangeChecklistByOrder,
  reorderItems,
};
