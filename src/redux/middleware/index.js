/* eslint-disable */
import { all } from 'redux-saga/effects';
import { userAuth } from './userAuthSagas';
import {
  watchFetchRequests,
  watchCreateNewRequestAsync,
  watchFetchUserRequestsDetails,
  watchEditRequest,
  watchDeleteRequest,
  watchFetchEditRequest
} from './requestsSaga';
import {
  watchPostUserDataSagaAsync,
  watchGetUserDataSagaAsync,
  watchFetchUsersEmail,
  watchGetDepartmentDataSagaAsync
} from './userDataSaga';
import {
  watchGetRoleDataSagaAsync,
  watchPutRoleDataSagaAsync,
  watchAddRoleSaga,
  watchUpdateRoleSaga,
} from './roleDataSaga';
import {
  watchFetchRoleUsers,
  watchDeleteUserRoleAsync,
  watchUpdateBudgetCheckerAsync
} from './roleSaga';
import {
  watchCreateComment,
  watchEditComment,
  watchDeleteComment
} from './commentsSaga';
import {watchFetchApprovals, watchUpdateBudgetStatus, watchUpdateRequestStatus} from './approvalsSaga';
import {
  watchFetchNotifications,
  watchAddNotification,
  watchUpdateAllNotificationStatus,
  markSingleNotificationAsReadSaga
} from './notificationsSaga';

import { watchUpdateUserProfileAsync } from './UserProfileSaga';

import {
  watchCreateAccommodationSagaAsync,
  watchFetchAccommodation,
  watchFetchTimelneData,
  watchEditAccommodation,
  watchDisableAccommodation,
  watchFetchDisabledAccommodation,
  watchRestoreDisabledAccommodation
} from './accommodationSaga';

import { watchFetchOccupations } from './occupationSaga';

import { watchFetchAvailableRooms } from './availableRoomsSaga';

import { watchUpdateRoomsAsync } from './roomUpdateSaga';

import { watchFetchTeammates } from './homeSaga';

import {
  watchFetchTrips,
  watchUpdateTrip,
  watchUpdateTripRoom,
  watchValidateTrips,
} from './tripsSaga';
import {
  watchCreateChecklist,
  watchFetchAllChecklists,
  watchUpdateChecklist,
  watchDeleteChecklist,
  watchFetchDeletedChecklistItems,
  watchRestoreChecklist
} from './travelChecklistSaga';

import {
  watchFetchCalendarAnalytics,
  watchDownloadCalendarAnalytics
} from './travelCalendarSaga';

import { watchFetchCenters, watchUpdateUserCenters } from './centersSaga';
import { watchFetchAnalytics, watchdownloadAnalytics } from './analyticsSaga';
import {
  watchFetchReadiness, watchpassportScanSaga,
  watchExportReadiness, watchCreateTravelReadinessDocument
} from './travelReadinessSaga';

import { watchFetchDepartmentTrips } from './tripsAnalyticsSaga';

import {
  watchFetchDocuments,
  watchDeleteDocument,
  watchUpdateDocument,
  watchCreateDocument,
  watchDownloadDocuments
} from './DocumentSaga';
import {
  watchPostSubmission,
  watchFetchSubmission
} from './checklistSubmissionSaga';
import { watchFileUpload } from './fileUploadSaga';
import{
  watchAddMainteinanceAsync, watchUpdateMaintenance, watchDeleteMaintenance
} from './maintenanceSaga';
import {
  watchFetchAttachments,
  watchdownloadAttachments
} from './attachmentsSaga';
import {
  watchFetchUsersReadinessDocuments,
  watchFetchReadinessDocuments,
  watchFetchReadinessDocumentDetails,
  watchVerifyTravelReadinessDocuments,
  watchEditTravelReadinessDocument,
  watchDeleteTravelReadinessDocument,
} from './travelReadinessDocumentsSaga';
import {
  watchCreateEmailReminderTemplate,
  watchEnableEmailReminderTemplate,
  watchdisableEmailTemplate,
  watchGetSingleEmailReminderTemplate,
  watchUpdateSingleReminderEmailTemplateSaga
} from './reminderManagementSaga';
import { watchFetchAllEmailTemplates } from './listEmailTemplatesSaga';
import {
  watchDisableReminderCondition,
  watchfetchEmailReminders,
  watchEnableDisabledReminderCondition,
} from './emailRemindersSaga';
import { watchCreateReminder, watchEditReminder, watchGetSingleReminder } from './reminderSaga';
import { watchFetchAllTravelReasons } from './listTravelReasonsSaga';
import {
  watchCreateTravelStipendAsync,
  watchDeleteTravelStipend,
  watchgetAllTravelStipends,
  watchUpdateTravelStipend
} from './travelStipendsSaga';
import {
  watchgetTravelCostsByLocation
} from './travelCostsSaga';
import {watchCreateTravelReason, watchEditTravelReason, watchDeleteTravelReason, watchViewTravelReasonDetails} from './travelReasonsSaga';
import { watchAddRegionSagaAsync, watchFetchRegionDataSagaAsync } from './travelRegionSaga';
import {
  watchFetchModificationForRequest,
  watchSubmitModificationRequest,
  watchUpdateTripModification
} from "./tripModificationSaga";
import {watchCreateCountrySagaAsync, watchGetCountriesSagaAsync} from './countriesSaga';
import {
  watchCreateHotelEstimateAsync,
  watchgetAllHotelEstimates,
  watchDeleteHotelEstimate,
  watchUpdateHotelEstimate
} from './hotelEstimateSaga';
import {
  watchCreateFlightEstimateAsync,
  watchGetAllFlightEstimates, 
  watchUpdateFlightEstimate,
  watchDeleteFlightEstimate 
} from './flightEstimatesSaga';
import {
  watchAddChecklistWizard,
  watchHandleChecklistItems,
  watchDeleteItems,
  watchAddQuestion,
  watchDeleteQuestion,
  watchUpdateBehaviour,
  watchUpdateNationality,
  watchUpdateDestination,
  watchCreateDynamicChecklist
} from './travelChecklistWizardSaga';

import { watchAddResourcesSagaAsync, watchFetchLinkDataSagaAsync } from './helpResourceSaga';
import { watchgetAllDynamicChecklists} from './checklistWizardSaga';
import { watchPostNoPassportNotification } from './noPassportSaga';


function* rootSaga() {
  yield all([
    userAuth(),
    watchFetchRequests(),
    watchFetchApprovals(),
    watchCreateNewRequestAsync(),
    watchPostUserDataSagaAsync(),
    watchGetUserDataSagaAsync(),
    watchGetRoleDataSagaAsync(),
    watchPutRoleDataSagaAsync(),
    watchFetchRoleUsers(),
    watchFetchUserRequestsDetails(),
    watchCreateComment(),
    watchDeleteComment(),
    watchUpdateRequestStatus(),
    watchEditComment(),
    watchFetchNotifications(),
    watchUpdateRoomsAsync(),
    watchUpdateUserProfileAsync(),
    watchEditRequest(),
    watchAddNotification(),
    watchFetchAccommodation(),
    watchEditAccommodation(),
    watchUpdateAllNotificationStatus(),
    watchCreateAccommodationSagaAsync(),
    watchFetchTimelneData(),
    markSingleNotificationAsReadSaga(),
    watchFetchTrips(),
    watchUpdateTrip(),
    watchFetchOccupations(),
    watchFetchAllChecklists(),
    watchUpdateChecklist(),
    watchCreateChecklist(),
    watchDeleteChecklist(),
    watchRestoreChecklist(),
    watchFetchCenters(),
    watchUpdateUserCenters(),
    watchFetchDeletedChecklistItems(),
    watchFetchAvailableRooms(),
    watchUpdateTripRoom(),
    watchFetchAnalytics(),
    watchDeleteUserRoleAsync(),
    watchFetchDepartmentTrips(),
    watchFetchReadiness(),
    watchFetchCalendarAnalytics(),
    watchDownloadCalendarAnalytics(),
    watchdownloadAnalytics(),
    watchFetchDocuments(),
    watchDeleteDocument(),
    watchUpdateDocument(),
    watchCreateDocument(),
    watchExportReadiness(),
    watchPostSubmission(),
    watchFetchSubmission(),
    watchDownloadDocuments(),
    watchFileUpload(),
    watchAddMainteinanceAsync(),
    watchDownloadDocuments(),
    watchAddRoleSaga(),
    watchUpdateRoleSaga(),
    watchDeleteRequest(),
    watchFetchAttachments(),
    watchdownloadAttachments(),
    watchUpdateMaintenance(),
    watchDeleteMaintenance(),
    watchDisableAccommodation(),
    watchFetchDisabledAccommodation(),
    watchRestoreDisabledAccommodation(),
    watchCreateTravelReadinessDocument(),
    watchFetchUsersReadinessDocuments(),
    watchFetchReadinessDocuments(),
    watchFetchReadinessDocumentDetails(),
    watchFetchTeammates(),
    watchVerifyTravelReadinessDocuments(),
    watchfetchEmailReminders(),
    watchEditTravelReadinessDocument(),
    watchCreateEmailReminderTemplate(),
    watchDeleteTravelReadinessDocument(),
    watchFetchAllEmailTemplates(),
    watchCreateReminder(),
    watchEnableEmailReminderTemplate(),
    watchDisableReminderCondition(),
    watchEnableDisabledReminderCondition(),
    watchdisableEmailTemplate(),
    watchUpdateSingleReminderEmailTemplateSaga(),
    watchGetSingleEmailReminderTemplate(),
    watchEditReminder(),
    watchGetSingleReminder(),
    watchFetchUsersEmail(),
    watchGetDepartmentDataSagaAsync(),
    watchFetchAllTravelReasons(),
    watchCreateTravelReason(),
    watchgetAllTravelStipends(),
    watchDeleteTravelStipend(),
    watchEditTravelReason(),
    watchCreateTravelStipendAsync(),
    watchViewTravelReasonDetails(),
    watchDeleteTravelReason(),
    watchUpdateTravelStipend(),
    watchValidateTrips(),
    watchUpdateBudgetStatus(),
    watchFetchEditRequest(),
    watchUpdateBudgetCheckerAsync(),
    watchAddRegionSagaAsync(),
    watchFetchRegionDataSagaAsync(),
    watchCreateCountrySagaAsync(),
    watchGetCountriesSagaAsync(),
    watchSubmitModificationRequest(),
    watchFetchModificationForRequest(),
    watchUpdateTripModification(),
    watchgetAllHotelEstimates(),
    watchCreateHotelEstimateAsync(),
    watchDeleteHotelEstimate(),
    watchUpdateHotelEstimate(),
    watchgetTravelCostsByLocation(),
    watchFetchLinkDataSagaAsync(),
    watchAddResourcesSagaAsync(),
    watchpassportScanSaga(),
    watchCreateFlightEstimateAsync(),
    watchGetAllFlightEstimates(),
    watchUpdateFlightEstimate(),
    watchDeleteFlightEstimate(),
    watchgetAllDynamicChecklists(),
    watchAddChecklistWizard(),
    watchHandleChecklistItems(),
    watchDeleteItems(),
    watchDeleteQuestion(),
    watchUpdateBehaviour(),
    watchUpdateNationality(),
    watchUpdateDestination(),
    watchCreateDynamicChecklist(),
    watchAddQuestion(),
    watchPostNoPassportNotification(),
  ]);
}

export default rootSaga;
