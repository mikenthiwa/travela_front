import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import FlightDetailsForm from './FlightDetailsForm';
import './FlightDetails.scss';

class FlightDetails extends Component {
  constructor(props){
    super(props);
    let checkID;
  }

  render() {
    const { 
      submissions, request, uploadFile, downloadAttachments, fileUploads,
      postSubmission, tripType 
    } = this.props;
    let counter = 0;
    return (
      <div className="ticketContainer">
        <div className="flight-guide">Flight Application Guide</div>
        <br />
        {submissions.map((submission) => {
          counter++;
          const ticketCheckList = {};
          submission.checklist.map(checklist => {
            if (checklist.name === 'Travel Ticket') {
              ticketCheckList['ticket'] = checklist;
            }
            if (checklist.name === 'Travel Ticket Details') {
              ticketCheckList['ticketDetails'] = checklist;
            }
          });
          const trip = request.trips.find(trip => trip.id === submission.tripId);
          return (
            <FlightDetailsForm
              uploadFile={uploadFile}
              request={request}
              checklist={ticketCheckList}
              tripId={submission.tripId}
              downloadAttachments={downloadAttachments}
              fileUploads={fileUploads}
              postSubmission={postSubmission}
              tripType={tripType}
              handleInputChange={this.handleInputChange}
              trip={trip}
              counter={counter}
              checkId={`${submission.tripId}-${
                ticketCheckList['ticket'].id
              }`}
              key={`${submission.tripId}-${
                ticketCheckList['ticket'].id
              }`}
            />
          ); 
        })}
      </div>
    ); 
  }
}
FlightDetails.defaultProps ={
  downloadAttachments: () => {}
};

FlightDetails.propTypes = {
  request: PropTypes.object.isRequired,
  uploadFile: PropTypes.func.isRequired,
  downloadAttachments: PropTypes.func,
  postSubmission: PropTypes.func.isRequired,
  tripType: PropTypes.string.isRequired,
  fileUploads: PropTypes.func.isRequired,
  submissions: PropTypes.array.isRequired
};

export default FlightDetails;
