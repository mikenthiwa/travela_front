import _ from 'lodash';
import {
  FETCH_ALL_TRAVEL_STIPENDS,
  FETCH_ALL_TRAVEL_STIPENDS_SUCCESS,
  FETCH_ALL_TRAVEL_STIPENDS_FAILURE,
  DELETE_TRAVEL_STIPEND,
  DELETE_TRAVEL_STIPEND_SUCCESS,
  DELETE_TRAVEL_STIPEND_FAILURE,
  FETCH_SINGLE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND,
  CREATE_TRAVEL_STIPEND_SUCCESS,
  CREATE_TRAVEL_STIPEND_FAILURE,
  EDIT_TRAVEL_STIPEND,
  EDIT_TRAVEL_STIPEND_SUCCESS,
  EDIT_TRAVEL_STIPEND_FAILURE
} from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  isDeleting: false,
  stipends: [],
  error: {},
  selectedStipend: {},
  updatedStipend: {
    isSaving: false,
    errors: {},
    data: {}
  }
};

const editTravelStipend = (state = initialState, action) => {
  switch (action.type) {
  case EDIT_TRAVEL_STIPEND:
    return {...state,
      updatedStipend: {
        isSaving: true,
        errors: {}
      }
    };
  case EDIT_TRAVEL_STIPEND_FAILURE:
    return {
      ...state,
      updatedStipend: {
        isSaving: false,
        errors: action.errors || action.error || action.message || {}
      }
    };

  case EDIT_TRAVEL_STIPEND_SUCCESS:{
    const stipendsList = state.stipends.slice();
    const {response: { travelStipend: { id, amount } } } = action;
    const index = _.findIndex(stipendsList, { id });

    stipendsList[index] = { ...stipendsList[index],
      amount
    };

    return {...state,
      stipends: stipendsList,
      updatedStipend: {
        isSaving: false,
        errors: {},
        data: action.response.travelStipend
      }
    };
  }
  default:
    return state;
  }
};
const deleteTravelStipend = (state = initialState, action) => {
  switch(action.type){
  case  FETCH_SINGLE_TRAVEL_STIPEND: {
    const { stipends } = state;
    return {
      ...state,
      selectedStipend: stipends.find(stipend => stipend.id === action.stipendId) || {},
    };
  }
  case DELETE_TRAVEL_STIPEND:
    return{
      ...state,
      isDeleting: true
    };
  case DELETE_TRAVEL_STIPEND_SUCCESS: {
    const stipends = state.stipends.filter(stipend =>
      stipend.id !== action.stipendId);
    return {
      ...state,
      isDeleting: false,
      stipends: stipends,
    };
  }
  case DELETE_TRAVEL_STIPEND_FAILURE:
    return {
      ...state,
      isDeleting: false,
      error: action.error
    };
  default:
    return editTravelStipend(state, action);
  }
};

const travelStipends = (state = initialState, action) => {
  switch (action.type) {
  case FETCH_ALL_TRAVEL_STIPENDS:
    return {...state, isLoading: true};
  case FETCH_ALL_TRAVEL_STIPENDS_SUCCESS:
    return {...state,
      isLoading: false,
      stipends: action.stipends
    };
  case FETCH_ALL_TRAVEL_STIPENDS_FAILURE:
    return {...state, isLoading: false, error: action.error};

  case CREATE_TRAVEL_STIPEND:
    return {...state, isLoading: true};
  case CREATE_TRAVEL_STIPEND_SUCCESS:
    return {
      ...state,
      travelStipend: action.newStipend,
      error: {},
      isLoading: false
    };
  case CREATE_TRAVEL_STIPEND_FAILURE:
    return {...state,
      travelStipend: {},
      error: {
        error:
      action.error,
      },
      isLoading: false
    };
  case FETCH_SINGLE_TRAVEL_STIPEND: {
    const { stipends } = state;
    return {...state,
      selectedStipend: stipends.find(
        stipend => stipend.id === action.stipendId)
        || {},
    };
  }
  default:
    return deleteTravelStipend(state,action);
  }
};





export default travelStipends;
