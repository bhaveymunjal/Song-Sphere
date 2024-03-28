/* eslint-disable no-array-constructor */
export const initialState = {
  user: null,
  playlists: [],
  playing: false,
  artists: [],
  item: null,
  devices: null,
  token: null,
  releases: [],
  CurrentlyPlaying: null,
  relatedArtist: [],
  playerState: false,
  time: 0,
  charts: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    case 'SET_PLAYLISTS':
      return {
        ...state,
        playlists: action.playlists,
      };
    case 'SET_ARTISTS':
      return {
        ...state,
        artists: action.artists,
      };
    case 'SET_RELEASES':
      return {
        ...state,
        releases: action.releases,
      };
    case 'SET_TIME':
      return {
        ...state,
        time: action.time,
      };
    case 'SET_RELATEDARTISTS':
      return {
        ...state,
        relatedArtist: action.relatedArtist,
      };
    case 'SET_ITEM':
      return {
        ...state,
        item: action.item,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.duration,
      };
    case 'SET_PLAYER_STATE':
      return {
        ...state,
        playerState: action.playerState,
      };
    case 'SET_DEVICES':
      return {
        ...state,
        devices: action.devices,
      };
    case 'SET_CHARTS':
      return {
        ...state,
        charts: action.charts,
      };
    default:
      return state;
  }
};
export default reducer;
