const CLIENT_ID = '1512fb9cbe8228095fe92c6503e3a071';
const TRACKS_BASE_URL = 'http://api.soundcloud.com/tracks';

export const MAX_SONGS_PER_PAGE = 20; //The API returns 1 object less than the value passed as a limit
export const CLIENT_ID_QUERY = '?client_id=' + CLIENT_ID;
export const DEFAULT_SEARCH = TRACKS_BASE_URL + CLIENT_ID_QUERY + '&limit=' + MAX_SONGS_PER_PAGE + '&linked_partitioning=1&q=';

export const DEFAULT_INITIAL_SEARCH = TRACKS_BASE_URL + CLIENT_ID_QUERY +'&limit=20&offset=0&linked_partitioning=1&app_locale=en';
