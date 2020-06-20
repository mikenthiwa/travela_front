import { FETCH_OCCUPATIONS_SUCCESS } from '../constants/actionTypes';

const initialState = { occupations: [] };
const occupations = (state = initialState, action) => {
  switch (action.type){
  case FETCH_OCCUPATIONS_SUCCESS:  
    return {...state, occupations: action.occupations };
  default: return state;
  }
  
};

export default occupations;
