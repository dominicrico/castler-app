export const GET_CASTLES = 'castler/castles/LOAD';
export const GET_CASTLES_SUCCESS = 'castler/castles/LOAD_SUCCESS';
export const GET_CASTLES_FAIL = 'castler/castles/LOAD_FAIL';
export const GET_CASTLE_INFO = 'castler/castles/INFO';
export const GET_CASTLE_INFO_SUCCESS = 'castler/castles/INFO_SUCCESS';
export const GET_CASTLE_INFO_FAIL = 'castler/castles/INFO_FAIL';
export const GET_CASTLES_SEARCH = 'castler/castles/SEARCH';
export const GET_CASTLES_SEARCH_SUCCESS = 'castler/castles/SEARCH_SUCCESS';
export const GET_CASTLES_SEARCH_FAIL = 'castler/castles/SEARCH_FAIL';

export default function reducer(state = { castles: [], page: 1, pages: 0, term: null, total: 0 }, action) {
  switch (action.type) {
    case GET_CASTLES:
      return { ...state, loading: true, term: null }
    case GET_CASTLES_SUCCESS:
      return { ...state, loading: false, term: null, castles: action.payload.data.docs, page: action.payload.data.page, pages: action.payload.data.pages, total: action.payload.data.total}
    case GET_CASTLES_FAIL:
      return {
        ...state,
        loading: false,
        term: null,
        error: 'Error while fetching castles!'
      }
    case GET_CASTLES_SEARCH:
      return { ...state, loading: true, term: action.term }
    case GET_CASTLES_SEARCH_SUCCESS:
      return { ...state, loading: false, castles: action.payload.data.docs, page: action.payload.data.page, pages: action.payload.data.pages, total: action.payload.data.total }
    case GET_CASTLES_SEARCH_FAIL:
      return {
        ...state,
        loading: false,
        term: null,
        error: 'Error while fetching castles!'
      }
    case GET_CASTLE_INFO:
      return { ...state, loading: true, term: null }
    case GET_CASTLE_INFO_SUCCESS:
      return { ...state, loading: false, term: null, castle: action.payload.data }
    case GET_CASTLE_INFO_FAIL:
      return {
        ...state,
        loading: false,
        term: null,
        error: 'Error getting castle info!'
      }
    default:
      return state
  }
}

export function listCastles(page = 1) {
  return {
    type: GET_CASTLES,
    term: null,
    payload: {
      request: {
        url: `/castles/all?page=${page}`
      }
    }
  }
}

export function findCastles(term, page = 1) {
  return {
    type: GET_CASTLES_SEARCH,
    term: term,
    payload: {
      request: {
        url: `/castles/search?q=${term}&page=${page}`
      }
    }
  }
}

export function getCastleDetail(castle) {
  return {
    type: GET_CASTLE_INFO,
    term: null,
    payload: {
      request: {
        url: `/castles/${castle}`
      }
    }
  }
}
