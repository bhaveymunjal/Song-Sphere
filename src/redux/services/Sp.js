
const CLIENT_ID = '18086d02e421432eb598af7bc154e249';
const REDIRECT_URL = 'http://localhost:3000/';
export const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const RESPONSE_TYPE = 'token';
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-top-read',
  'streaming',
  'user-read-email',
  'user-read-private',
];

// eslint-disable-next-line arrow-body-style
export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};

export const loginUrl = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${scopes.join('%20')}&response_type=${RESPONSE_TYPE}&show_dialog=true`;
