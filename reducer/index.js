export const GET_CASTLES = 'castler/castles/LOAD';
export const GET_CASTLES_SUCCESS = 'castler/castles/LOAD_SUCCESS';
export const GET_CASTLES_FAIL = 'castler/castles/LOAD_FAIL';
export const GET_CASTLE_INFO = 'castler/castles/INFO';
export const GET_CASTLE_INFO_SUCCESS = 'castler/castles/INFO_SUCCESS';
export const GET_CASTLE_INFO_FAIL = 'castler/castles/INFO_FAIL';

export default function reducer(state = { castles: [], page: 1, pages: 1 }, action) {
  switch (action.type) {
    case GET_CASTLES:
      return { ...state, loading: true }
    case GET_CASTLES_SUCCESS:
      return { ...state, loading: false, castles: action.payload.data.docs, page: action.payload.data.page, pages: action.payload.data.pages}
    case GET_CASTLES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching castles!'
      }
    case GET_CASTLE_INFO:
      return { ...state, loading: true }
    case GET_CASTLE_INFO_SUCCESS:
      return { ...state, loading: false, castle: action.payload.data }
    case GET_CASTLE_INFO_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error getting castle info!'
      }
    default:
      return state
  }
}

export function listCastles(page = 1) {
  return {
    type: GET_CASTLES,
    payload: {
      request: {
        url: `/castles/all?page=${page}`
      }
    }
  }
}

export function getCastleDetail(castle) {
  return {
    type: GET_CASTLE_INFO,
    payload: {
      request: {
        url: `/castles/${castle}`
      }
    }
  }
}
