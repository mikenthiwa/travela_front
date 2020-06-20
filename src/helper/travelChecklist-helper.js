export const getSubmittedItemsId = (accumulatedArr, list) => {
  const submittedItemsId = [];
  const { checklist } = list;
  checklist.forEach(item => {
    if (item.submissions.length) {
      const [submittedItem] = item.submissions;
      const { tripId, checklistItemId } = submittedItem;

      const id = `${tripId}-${checklistItemId}`;
      submittedItemsId.push(id);
    }
  });

  return [...accumulatedArr, ...submittedItemsId];
};

export const getItemsToCheck = (checklists) => {
  const itemsToCheck = checklists.reduce(getSubmittedItemsId, []);
  return itemsToCheck;
};
