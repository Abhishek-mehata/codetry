export const setReservationCache = (category: 'all' | 'event' | 'stay', data: unknown[]) => ({
  type: 'SET_RESERVATION_CACHE',
  payload: { category, data },
});

export const clearReservationCache = (category: 'all' | 'event' | 'stay') => ({
  type: 'CLEAR_RESERVATION_CACHE',
  payload: { category },
}); 