import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import approvals from './approvals';
import modal from './modal';
import user from './user';
import role from './role';
import notifications from './notifications';
import comments from './comments';
import rooms from './room';
import accommodation from './accommodation';
import trips from './trips';
import occupations from './occupations';
import travelChecklist from './travelChecklist';
import centers from './centers';
import availableRooms from './availableRooms';
import analytics from './analytics';
import readiness from './readiness';
import reminderManagement from './reminderManagement';
import travelCalendar from './travelCalendar';
import documents from './documents';
import submissions from './checklistSubmission';
import fileUploads from './fileUploads';
import attachments from './attachments';
import maintenance from './maintenance';
import travelReadinessDocuments from './travelReadinessDocuments';
import teammates from './teammates';
import emailReminders from './emailReminder';
import listEmailTemplatesReducer from './listEmailTemplates';
import reminders from './reminders';
import reminderTemplateDisableReducer from './reminderTemplateDisable';
import enableReminderEmailTemplateReducer from './enableReminderEmailTemplate';
import travelReason from './travelReason';
import travelStipends from './travelStipends';
import travelRegion from './travelRegion';
import country from './countries';
import tripModifications from './tripModifications';
import listAllhotelEstimates from './hotelEstimates';
import travelCosts from './travelCosts';
import helpResources from './helpResources';
import listAllFlightEstimates from './flightEstimates';
import checklistWizard from './checklistWizard';
import noPassport from './noPassport';
import documentTypes from './documentTypes';
import dynamicChecklistSubmission from './dynamicChecklistSubmission';
import department from './departments';

const rootReducer = combineReducers({
  auth,
  requests,
  approvals,
  modal,
  user,
  role,
  comments,
  notifications,
  rooms,
  accommodation,
  trips,
  occupations,
  travelCalendar,
  travelChecklist,
  centers,
  availableRooms,
  analytics,
  readiness,
  documents,
  submissions,
  fileUploads,
  attachments,
  maintenance,
  travelReadinessDocuments,
  emailReminders,
  teammates,
  reminderManagement,
  listEmailTemplatesReducer,
  reminders,
  enableReminderEmailTemplateReducer,
  reminderTemplateDisableReducer,
  travelReason,
  travelStipends,
  travelRegion,
  tripModifications,
  country,
  listAllhotelEstimates,
  travelCosts,
  helpResources,
  listAllFlightEstimates,
  checklistWizard,
  noPassport,
  documentTypes,
  dynamicChecklistSubmission,
  department
});

export default rootReducer;
