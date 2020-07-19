import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import decks from './decks';

export default combineReducers({
	decks,
	loadingBar: loadingBarReducer
});
