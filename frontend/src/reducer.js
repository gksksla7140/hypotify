import {
GET_TOKEN,
LOADING,
USER_RECEIVED,
FETCH_ERROR,
GET_PLAYLIST
} from './constant';


const initialState = {
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: [],
    user: null,
    playlist: null
};
export default  (state = initialState, action) => {
    // prevent state from changing
    Object.freeze(state);
    switch (action.type) {
    case GET_TOKEN:
        let {accessToken, refreshToken} = action.payload;
      return {
        ...state,
        accessToken,
        refreshToken
      };
    case LOADING:
      return { ...state, loading: true};
    case USER_RECEIVED:
      return {
          ...state,
          user: action.payload,
          loading: false,
          error: []  
      };
    case GET_PLAYLIST:
      return {
        ...state,
        playlist: action.payload
      }
    case FETCH_ERROR:
    const error = state.error;
      return {
          ...state,
          error: [...error, action.payload]
      }
    default:
      return state;
    }
};