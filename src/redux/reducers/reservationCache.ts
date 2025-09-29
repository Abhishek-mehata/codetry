import { AnyAction } from 'redux';

export interface ReservationCacheState {
  all: unknown[];
  event: unknown[];
  stay: unknown[];
}

const initialState: ReservationCacheState = {
  all: [],
  event: [],
  stay: [],
};

const reservationCache = (state = initialState, action: AnyAction): ReservationCacheState => {
  switch (action.type) {
    case 'SET_RESERVATION_CACHE':
      return {
        ...state,
        [action.payload.category]: action.payload.data,
      };
    case 'CLEAR_RESERVATION_CACHE':
      return {
        ...state,
        [action.payload.category]: [],
      };
    default:
      return state;
  }
};

export default reservationCache; 