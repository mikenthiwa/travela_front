import formatDateString from '../../helper/formatDateString';

export default function (attachments) {
  const checklistItems = [];
  const ticketDetails = [];
  const attachmentDetails = [];
  attachments.map(item => {
    return item.checklist.filter(checklistItem => {
        
      if (checklistItem.submissions[0] && checklistItem.submissions[0].userUpload.url) {
        const result = {
          itemId: checklistItem.id,
          itemName: checklistItem.name,
          itemDestination: checklistItem.destinationName,
          itemTripId: item.tripId,
          itemUrl: checklistItem.submissions[0].userUpload.url,
          fileName: checklistItem.submissions[0].userUpload.fileName,
          uploadDate:formatDateString(new Date(checklistItem.submissions[0].updatedAt), true),
        };
        attachmentDetails.push(result);
      } else if (checklistItem.name === 'Travel Ticket Details' && checklistItem.submissions.length) {
        const result = {
          destination: item.tripLocation,
          airline: checklistItem.submissions[0].userUpload.airline,
          departureTime: formatDateString(new Date(checklistItem.submissions[0].userUpload.departureTime)),
          arrivalTime: formatDateString(new Date (checklistItem.submissions[0].userUpload.arrivalTime)),
          ticketNumber: checklistItem.submissions[0].userUpload.ticketNumber,
          returnTime: formatDateString(new Date(checklistItem.submissions[0].userUpload.returnTime)),
          returnDepartureTime:formatDateString(new Date(checklistItem.submissions[0].userUpload.returnDepartureTime)),
          returnTicketNumber: checklistItem.submissions[0].userUpload.returnTicketNumber,
          returnAirline: checklistItem.submissions[0].userUpload.returnAirline,
        };
        ticketDetails.push(result);
      } else {
        checklistItems.push(checklistItem);
      }
    });
  });
  return { checklistItems, ticketDetails, attachmentDetails };
}
