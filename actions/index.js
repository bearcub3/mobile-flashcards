import { getInitalData } from '../utils/api';
import { getUserDecks } from './decks';
import { getUserRecord } from './user';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

export function handleUsersData() {
	return (dispatch) => {
		dispatch(showLoading());
		return getInitalData().then(({ decks, user }) => {
			dispatch(getUserDecks(decks));
			dispatch(getUserRecord(user));
			dispatch(hideLoading());
		});
	};
}
