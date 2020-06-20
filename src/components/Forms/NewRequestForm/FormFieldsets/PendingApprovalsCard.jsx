import React, { Component } from 'react';

export default class PendingApprovals extends Component {
  render() {
    return (
      <div className="mdl-cell mdl-cell--5-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
        <div className="pending-approvals-rectangle">
          <div className="pending-approvals-text">
            <p> Pending Approvals For This Request</p>
          </div>
          <hr className="pending-approvals-line" />
          <div className="pending-approvals-block">
            <ul className="approval-list-items">
              <li className="approval-item"> 
                <div className="oval" />
                <div>Line Manager Approval</div>
              </li>
              <li className="approval-item"> 
                <div className="oval" />
                <div>Budget Checker Approval</div>
              </li>
              <li className="approval-item"> 
                <div className="oval" />
                <div>Travel readiness Verification</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
