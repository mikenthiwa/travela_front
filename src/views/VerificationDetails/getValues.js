import formatDateString from '../../helper/formatDateString';

export default function (attachments) {
  const checklistItems = [];
  const ticketDetails = [];
  const attachmentDetails = [];
  attachments.map(item => {
    return item.checklist.filter(checklistItem => {
        
      if (checklistItem.requiresFiles === true && checklistItem.submissions[0]) {
        const result = {
          itemId: checklistItem.id,
          itemName: checklistItem.name,
          itemUrl: checklistItem.submissions[0].value.url,
          fileName: checklistItem.submissions[0].value.fileName,
          uploadDate:formatDateString(new Date(checklistItem.submissions[0].updatedAt), true),
        };
        attachmentDetails.push(result);
      } else if (checklistItem.name === 'Travel Ticket Details' && checklistItem.submissions.length) {
        const result = {
          destination: item.destinationName,
          airline: checklistItem.submissions[0].value.airline,
          departureTime: formatDateString(new Date(checklistItem.submissions[0].value.departureTime)),
          arrivalTime: formatDateString(new Date (checklistItem.submissions[0].value.arrivalTime)),
          ticketNumber: checklistItem.submissions[0].value.ticketNumber,
          returnTime: formatDateString(new Date(checklistItem.submissions[0].value.returnTime)),
          returnDepartureTime:formatDateString(new Date(checklistItem.submissions[0].value.returnDepartureTime)),
          returnTicketNumber: checklistItem.submissions[0].value.returnTicketNumber,
          returnAirline: checklistItem.submissions[0].value.returnAirline,
        };
        ticketDetails.push(result);
      } else {
        checklistItems.push(checklistItem);
      }
    });
  });
  return { checklistItems, ticketDetails, attachmentDetails };
}
