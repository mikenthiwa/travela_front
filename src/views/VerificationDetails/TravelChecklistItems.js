import React from 'react';
import saveIcon from '../../images/icons/save-icon.svg';
import documentIcon from '../../images/document-rect.png';



export function AttachmentItems({ attachments, attachmentDetails, handleDownloadAttachments}) {
  return (
    attachmentDetails.map((item) => {
      const isPdf = item.itemUrl && item.itemUrl.substr(-3) ==='pdf';
      return (attachments.destinationName === item.itemDestination || attachments.tripId === item.itemTripId)? 
        (
          <div key={item.itemId} className="attachment-item">
            <p className="attachment-header">{item.itemName}</p>
            <div className="split">
              <div className="attachment-image">
                {isPdf ? (
                  <embed
                    src={`${item.itemUrl}#toolbar=0&statusbar=0&page=1`}
                    alt={item.itemName}
                    className="travelSubmission--input__input-field__image"
                    type="application/pdf"
                  />
                ): 
                  <img src={item.itemUrl} alt={item.itemName} className="travelSubmission--input__input-field__image" />}
              </div>
              <div className="attachment-value">
                <p className="bold">                                             
                  <span><strong>{item.fileName}</strong></span>       
                </p>
                <p>
                  <span>Uploaded </span> 
                  <span>{item.uploadDate}</span>
                </p>
                <button type="button" onClick={() => handleDownloadAttachments(item.itemUrl, item.fileName)}><img src={saveIcon} alt="save" /></button>
              
              </div>
            </div>
          </div>
        ): null;
    })
  );
}

export  function ChecklistItems({ destination, checklistItems }) {
  return (
    checklistItems.map(item => {
      return (item.submissions[0]  && destination === item.destinationName)?
        (
          <div key={item.id} className="checklist-items">
            <div className="checklist-item-name"><strong>{item.name}</strong></div>
            <div className="checklist-item-value">{item.submissions[0].value}</div>
          </div>
        )
        : null;                
    })  
  );
}

export function TicketDetails({ ticketDetails }) {

  return (
    ticketDetails.map(item => {
      return (
        <div key={item.ticketNumber} className="flight-detail clearfix">
          <div>
            <div className="destination">
              <span>Destination: </span>
              <span><strong>{item.destination}</strong></span>
            </div>
            <div className="detail-left">
              <p>Departure Time</p>
              <p><strong>{item.departureTime}</strong></p>
            </div> 
            <div className="detail-right">    
              <p>Arrival Time</p>  
              <p><strong>{item.arrivalTime}</strong></p>
            </div>               
            <div data-test="ticketNumber" className="detail-left">
              <p>Ticket Number</p>
              <p><strong>{item.ticketNumber}</strong></p>
            </div> 
            <div className="detail-right">
              <p>Airline</p>
              <p><strong key={item.airline}>{item.airline}</strong></p>
            </div> 
          </div> 
          { item.returnTicketNumber ? (
            <div className="return">
              <div className="destination">
                <span>Return From: </span>
                <span><strong>{item.destination}</strong></span>
              </div>
              <div className="detail-left">
                <p>Departure Time</p>
                <p><strong>{item.returnDepartureTime}</strong></p>
              </div> 
              <div className="detail-right">    
                <p>Arrival Time</p>  
                <p><strong>{item.returnTime}</strong></p>
              </div>               
              <div data-test="ticketNumber" className="detail-left">
                <p>Ticket Number</p>
                <p><strong>{item.returnTicketNumber}</strong></p>
              </div> 
              <div className="detail-right">
                <p>Airline</p>
                <p><strong key={item.returnAirline}>{item.returnAirline}</strong></p>
              </div> 
            </div>
          )            
            : null
          } 
        </div>                     
      );
    })   
  );
}
