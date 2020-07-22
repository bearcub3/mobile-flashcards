import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import decks from './decks';
import user from './user';

export default combineReducers({
	decks,
	user,
	loadingBar: loadingBarReducer
});
