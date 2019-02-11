// example from spotify-web-api-js doc
import Spotify from 'spotify-web-api-js';
import {
    GET_TOKEN,
    LOADING,
    USER_RECEIVED,
    FETCH_ERROR,
    GET_PLAYLIST,
    GET_PLAYLIST_TRACKS
} from './constant';

//make spotify api server
const spotifyApi = new Spotify();

//save acesstoken in our store and spotifyapi
export const setTokens = (payload) => dispatch => {
    let {accessToken} = payload;
    if (accessToken) {
       spotifyApi.setAccessToken(accessToken);
    }
    dispatch({ type:GET_TOKEN, payload});
};

// save user info in our store
export const getUser = () =>  dispatch => {
    // START LOADING
    dispatch({type: LOADING});
    spotifyApi.getMe()
    .then(res => {
        dispatch({
            type: USER_RECEIVED,
            payload: res
        });
    }).catch(e => {
        dispatch({
            type: FETCH_ERROR,
            payload: JSON.parse(e.response).error.message
        });
    });

}

export const getPlaylist = userId => dispatch => {
    dispatch({type: LOADING});
    spotifyApi.getUserPlaylists(userId)
    .then(res=> {
        dispatch({
            type: GET_PLAYLIST,
            payload: res
        })
    }).catch (e => {
        dispatch({
            type: FETCH_ERROR,
            payload: JSON.parse(e.response).error.message
        })
    })
}