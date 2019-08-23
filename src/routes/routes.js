import React from 'react';
import ConnectedDashboard from '../views/Dashboard';
import ConnectedRequests from '../views/Requests';
import ConnectedNewRequests from '../views/Requests/NewRequests';
import ConnectedOnboarding from '../views/Requests/NewRequests/UserOnboarding';
import ConnectedGuestHouseDetails from '../views/Accommodation/FullGuestHouseDetails';
import ConnectedApprovals from '../views/Approvals';
import ConnectedVerifications from '../views/Verifications';
import ConnectedRole from '../views/Role';
import ConnectedUserProfile from '../views/UserProfile';
import ConnectedAccommodation from '../views/Accommodation';
import ConnectedCheckIn from '../views/CheckIn';
import ConnectedChecklist from '../views/Checklist';
import ConnectedRoleDetails from '../views/RoleDetails';
import ConnectedReadiness from '../views/Readiness';
import ConnectedRequestDetailsPage from '../views/Requests/NewRequestPage';
import ConnectedTravelReadinessDocuments from '../views/TravelReadinessDocuments';
import ConnectedUserTravelReadinessDetails from '../views/TravelReadinessDocuments/UserTravelReadinessDetails';
import ConnectedChecklistWizard from '../views/ChecklistWizard';
import ConnectedHome from '../views/Home';
import ConnectedReminders from '../views/Reminders';
import ConnectedCreateEmailTemplate from '../views/ReminderSetup/CreateEmailTemplate';
import ConnectedReminderSetup from '../views/ReminderSetup';
import UpdateEmailTemplate from '../views/ReminderSetup/UpdateEmailTemplate';
import ConnectedCreateReminder from '../views/Reminders/CreateReminder';
import ConnectedTravelReasons from '../views/TravelReasons';
import ConnectedTravelStipend from '../views/TravelStipends';
import ConnectedApproveRequests from '../views/ApproveRequests';
import ConnectedVerificationDetails from '../views/VerificationDetails';
import ConnectedTravelRegion from '../views/TravelRegion';
import ConnectedCountries from '../views/Countries';
import ConnectedHotelEstimate from '../views/HotelEstimate';
import ConnectedHelpers from '../views/HelpLinks';
import ConnectedFlightEstimate from '../views/FlightEstimates';
import ConnectedChecklistWizardInterface from '../views/ChecklistWizardInterface';
import ConnectedUserChecklist from '../views/UserChecklist';
import ConnectedDocumentTypes from '../views/DocumentTypes';


import {
  SUPER_ADMINISTRATOR,
  MANAGER, BUDGET_CHECKER, TRAVEL_MANAGERS, FINANCE_TEAM_MEMBER
} from '../helper/roles';

const routes = {
  '/dashboard': [ConnectedDashboard, TRAVEL_MANAGERS],
  '/home': [ConnectedHome],
  '/welcome-page': [ConnectedOnboarding()],
  '/requests/my-approvals/': [ConnectedApprovals(), [SUPER_ADMINISTRATOR, MANAGER]],
  '/requests/my-approvals/:requestId': [ConnectedApproveRequests(), [SUPER_ADMINISTRATOR, MANAGER]],
  '/requests/budgets/:requestId': [ConnectedApproveRequests('budget'),[SUPER_ADMINISTRATOR, BUDGET_CHECKER, FINANCE_TEAM_MEMBER]],
  '/requests/budgets/': [ConnectedApprovals('budget'), [SUPER_ADMINISTRATOR, BUDGET_CHECKER]],
  '/requests/my-verifications': [ConnectedVerifications, TRAVEL_MANAGERS],
  '/requests/my-verifications/:requestId': [ConnectedVerificationDetails(), [FINANCE_TEAM_MEMBER, ...TRAVEL_MANAGERS ]],
  '/requests': [ConnectedRequests],
  '/new-requests': [ConnectedRequests],
  '/requests/new-request': [ConnectedNewRequests()],
  '/requests/edit-request/:request_id': [ConnectedNewRequests(true)],
  '/travel_readiness': [ConnectedReadiness],
  '/travel-cost/travel-stipends': [ConnectedTravelStipend, TRAVEL_MANAGERS],
  '/settings/roles': [ConnectedRole, [SUPER_ADMINISTRATOR]],
  '/requests/:requestId': [ConnectedRequestDetailsPage],
  '/new-requests/:requestId': [ConnectedRequestDetailsPage],
  '/travel-cost/hotel-estimates': [ConnectedHotelEstimate, TRAVEL_MANAGERS],
  '/travel-cost/flight-estimates': [ConnectedFlightEstimate, TRAVEL_MANAGERS],
  '/requests/:requestId/checklist': [ConnectedRequestDetailsPage],
  '/settings/profile': [ConnectedUserProfile],
  '/residence/manage': [ConnectedAccommodation, TRAVEL_MANAGERS],
  '/residence/manage/guest-houses/:guestHouseId': [ConnectedGuestHouseDetails],
  '/residence/checkin': [ConnectedCheckIn],
  '/trip-planner/checklists': [ConnectedChecklist, TRAVEL_MANAGERS],
  '/trip-planner/travel-readiness': [ConnectedTravelReadinessDocuments, TRAVEL_MANAGERS],
  '/trip-planner/checklist-wizard': [ConnectedChecklistWizard, TRAVEL_MANAGERS],
  '/trip-planner/checklist-wizard/edit-checklist/:checklistId': [ConnectedChecklistWizard, TRAVEL_MANAGERS],
  '/trip-planner/checklist-wizard?make_copy=checklistId': [ConnectedChecklistWizard, TRAVEL_MANAGERS],
  '/travel-readiness/:userId': [ConnectedUserTravelReadinessDetails, TRAVEL_MANAGERS],
  '/settings/roles/:roleId': [ConnectedRoleDetails, TRAVEL_MANAGERS],
  '/settings/reminder-setup': [ConnectedReminderSetup, TRAVEL_MANAGERS],
  '/settings/reminder-setup/create': [ConnectedCreateEmailTemplate, TRAVEL_MANAGERS],
  '/settings/reminders/create': [ConnectedCreateReminder, TRAVEL_MANAGERS],
  '/settings/reminder-setup/update/:templateId': [UpdateEmailTemplate, TRAVEL_MANAGERS],
  '/settings/reminders/edit/:conditionId': [ConnectedCreateReminder, TRAVEL_MANAGERS],
  '/settings/reminders': [ConnectedReminders,TRAVEL_MANAGERS],
  '/settings/travel-reason': [ConnectedTravelReasons, TRAVEL_MANAGERS],
  '/help': [ConnectedHelpers],
  '/settings/travel-region': [ConnectedTravelRegion, TRAVEL_MANAGERS],
  '/settings/travel-region/:regionId': [ConnectedCountries, TRAVEL_MANAGERS],
  '/trip-planner/checklist-wizard-interface': [ConnectedChecklistWizardInterface, TRAVEL_MANAGERS],
  '/new-requests/:requestId/checklists': [ConnectedRequestDetailsPage],
  '/settings/document-types': [ConnectedDocumentTypes, TRAVEL_MANAGERS],
};

export default routes;
