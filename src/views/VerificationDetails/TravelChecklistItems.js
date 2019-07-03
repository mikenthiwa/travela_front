import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import moment from 'moment';
import documentIcon from '../../images/icons/uploaded-document.svg';



export function AttachmentItem (itemName, imageUrl, onclick) {
  return (
    <div className="uploaded-button">
      <button
        type="button"
        className="upload-btn__uploaded"
        onClick={() => onclick(imageUrl, itemName)}
      >
        <img src={documentIcon} alt="file" />
        <p>{itemName}</p>
      </button>
    </div>
  );
}



export function UserResponse (response) {
  return (
    <div className="checklist-item-value">
      <div 
        className={`${response.toLowerCase() === 'pending reply' ? 
          'pending-checklist' :'checklist-button'}`} 
        type="button">
        {_.startCase(response)}
      </div>
    </div>
  );
}

export  function ChecklistItems({ destination, checklistItems, handleDownloadAttachments }) {
  return (
    checklistItems.map((checklist, index) => {
      const { submissions : [item]}  = checklist;
      const  userResponse = !!(item && item.userResponse !== null);
      const userUpload = !!(item && item.userUpload.fileName !== undefined);
      const message = userResponse ? 'Replied on ' : 'Uploaded on ';
      const updateDate = item && moment(item.updatedAt).format('DD/MM/YYYY');
      let response = (!userResponse && !userUpload) && 'Pending Reply';
      response =  userResponse ? item.userResponse : response ;
      return (destination === checklist.destinationName)?
        (
          <div key={checklist.id} className="checklist-items">
            <div className="checklist-item-name">
              <p className="checklist-item-number">{index+1}</p>
              <strong>{checklist.name}</strong>
              <p className="response-message">
                {userResponse || userUpload ? message : ''}
                <span>{updateDate}</span>
              </p>
              <div>
                {
                  userUpload ? AttachmentItem(
                    item.userUpload.fileName, 
                    item.userUpload.url,
                    handleDownloadAttachments) :
                    UserResponse(response)
                }
              </div>
            </div>
          </div>
        )
        : null;                
    })  
  );
}

export function DateFormat(date) {
  return moment(date).format('DD-MM-YYYY, h:mm a');
}

export function GetTicketDetail(details, key) {
  return (details && details.userUpload[key] !== undefined) ? details.userUpload[key] : 'Pending';
}

export function TicketDetails({ submissions ,handleDownloadAttachments}) {
  return (
    <div className="flight-details">
      {submissions.map((submission, index) => {
        const locationDetails = `${submission.tripOrigin} to ${submission.destinationName}`;
        const flightChecklist = {};
        submission.checklist.map(checklist => {
          if(checklist.name === 'Travel Ticket Details') flightChecklist['ticketDetails'] = checklist;
          if(checklist.name === 'Travel Ticket') flightChecklist['ticket'] = checklist;
        });
        const details = flightChecklist['ticketDetails'].submissions !== undefined ?
          flightChecklist['ticketDetails'].submissions[0] : undefined;
        const ticketItem = flightChecklist['ticket'].submissions !== undefined ?
          flightChecklist['ticket'].submissions[0] : undefined;
        const flightTicket = (ticketItem && ticketItem.userUpload.fileName !== undefined) ? true : false;
        const departureTime = GetTicketDetail(details, 'departureTime') !== 'Pending' ?
          DateFormat(GetTicketDetail(details, 'departureTime')) : 'Pending';
        const arrivalTime = GetTicketDetail(details, 'arrivalTime') !== 'Pending' ?
          DateFormat(GetTicketDetail(details, 'arrivalTime')) : 'Pending';
        const valueClass = (val) => (`value ${val === 'Pending' ? 'pending': ''}`);
        const flightNumber = GetTicketDetail(details, 'flightNumber');
        const airline = GetTicketDetail(details, 'airline');
        return (
          <div key={submission.tripId} className="flight-details-form">
            <div className="checklist-item-name">
              <p className="checklist-item-number">{index+1}</p>
              <strong>{locationDetails}</strong>
            </div>
            <div className="ticket-details">
              <div className="flight-departure details">
                <p className="details-title">Departure Time</p>
                <p className={valueClass(departureTime)}>{departureTime}</p>
              </div>
              <div className="flight-arrival details">
                <p className="details-title">Arrival Time</p>
                <p className={valueClass(arrivalTime)}>{arrivalTime}</p>
              </div>
              <div className="flight-number details">
                <p className="details-title">Flight Number</p>
                <p className={valueClass(flightNumber)}>{flightNumber}</p>
              </div>
              <div className="flight-airline details ">
                <p className="details-title">Airline</p>
                <p className={valueClass(airline)}>{airline}</p>
              </div>
            </div>
            <div className="ticket-attachment">
              <p className="ticket-attachment__title">Flight Ticket</p>
              {flightTicket ? AttachmentItem(
                ticketItem.userUpload.fileName,
                ticketItem.userUpload.url,
                handleDownloadAttachments
              ) : (
                <div className="pending-upload" type="button">
                  Pending
                </div>
              )}
            </div>
          </div>
        );
      })
      }
    </div>
  );
}

TicketDetails.propTypes = {
  submissions: PropTypes.array.isRequired ,
  handleDownloadAttachments: PropTypes.func.isRequired
};
