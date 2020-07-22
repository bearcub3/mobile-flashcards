import { saveUserAnswer } from '../utils/api';

export const GET_USER = 'GET_USER';
export const SUBMIT_USER_ANSWER = 'SUBMIT_USER_ANSWER';

export function getUserRecord(user) {
	return {
		type: GET_USER,
		user
	};
}

function submitUserAnswer({ category, userAnswers }) {
	return {
		type: SUBMIT_USER_ANSWER,
		category,
		userAnswers
	};
}

export function handleSaveUserAnswer(info) {
	return (dispatch) => {
		dispatch(submitUserAnswer(info));
		return saveUserAnswer(info);
	};
}
