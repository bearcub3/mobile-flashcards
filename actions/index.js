import { getUserDecksData } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export const GET_DECKS = 'GET_DECKS';

function getUserDecks(decks) {
	return {
		type: GET_DECKS,
		decks
	};
}

export function handleUsersDecks() {
	return (dispatch) => {
		return getUserDecksData().then(({ decks }) => {
			dispatch(showLoading());
			dispatch(getUserDecks(decks));
			dispatch(hideLoading());
		});
	};
}
