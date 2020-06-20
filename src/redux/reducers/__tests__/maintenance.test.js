import maintenance from '../maintenance';
import { 
  updateMaintenanceRecord, 
  updateMaintenanceRecordSuccess, 
  updateMaintenanceRecordError
} from '../../actionCreator/maintenanceAction';
import { UPDATE_MAINTENANCE_RECORD, 
  UPDATE_MAINTENANCE_RECORD_SUCCESS, 
  UPDATE_MAINTENANCE_RECORD_FAILURE,
  DELETE_MAINTENANCE_RECORD,
  DELETE_MAINTENANCE_RECORD_SUCCESS,
  DELETE_MAINTENANCE_RECORD_FAILURE
} from '../../constants/actionTypes';


describe('Maintenance Reducer', () => {
  let action, newState, expectedState;
  let initialState = {
    isLoading: false,
    maintenance: {},
    error: '',
    roomId: ''
  };

  describe('Update maintenance reducer', () => {
    it('should return initial state', () => {
      expect(maintenance(undefined, {})).toEqual(initialState);
    });

    it('should handle UPDATE_MAINTENANCE_RECORD', () => {
      action = {
        type: UPDATE_MAINTENANCE_RECORD,
      };
      newState = maintenance(initialState, action);
      expectedState = {
        ...initialState,
        isLoading: true
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle UPDATE_MAINTENANCE_RECORD_SUCCESS', () => {
      action = {
        type: UPDATE_MAINTENANCE_RECORD_SUCCESS,
        maintenance: { start: '11/2/2018'}
      };
      newState = maintenance(initialState, action);
      expectedState = {
        ...initialState,
        isLoading: false,
        maintenance: { start: '11/2/2018'}
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle UPDATE_MAINTENANCE_RECORD_FAILURE', () => {
      action = {
        type: UPDATE_MAINTENANCE_RECORD_FAILURE,
        error: 'error'
      };
      newState = maintenance(initialState, action);
      expectedState = {
        ...initialState,
        isLoading: false,
        error: 'error'
      };
      expect(newState).toEqual(expectedState);
    });
  });

  describe('Delete maintenance reducer', () => {
    it('should handle DELETE_MAINTENANCE_RECORD', () => {
      action = {
        type: DELETE_MAINTENANCE_RECORD,
      };
      newState = maintenance(initialState, action);
      expectedState = {
        ...initialState,
        isLoading: true
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_MAINTENANCE_RECORD_SUCCESS', () => {
      action = {
        type: DELETE_MAINTENANCE_RECORD_SUCCESS,
        roomId: 'yt678hjK'
      };
      newState = maintenance(initialState, action);
      expectedState = {
        ...initialState,
        isLoading: false,
        roomId: 'yt678hjK'
      };
      expect(newState).toEqual(expectedState);
    });

    it('should handle DELETE_MAINTENANCE_RECORD_FAILURE', () => {
      action = {
        type: DELETE_MAINTENANCE_RECORD_FAILURE,
        error: 'error'
      };
      newState = maintenance(initialState, action);
      expectedState = {
        ...initialState,
        isLoading: false,
        error: 'error'
      };
      expect(newState).toEqual(expectedState);
    });
  });
});
