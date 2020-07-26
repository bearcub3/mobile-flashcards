import * as userActionTypes from '../actions/user';

export default function user(state = {}, action) {
	switch (action.type) {
		case userActionTypes.GET_USER:
			return {
				...state,
				...action.user
			};
		case userActionTypes.SUBMIT_USER_ANSWER:
			return {
				...state,
				[action.category]: {
					...state[action.category],
					userAnswers: state[action.category].userAnswers.concat([action.userAnswers])
				}
			};
		case userActionTypes.RESET_USER_ANSWER:
			return {
				...state,
				[action.category]: {
					...state[action.category],
					userAnswers: action.userAnswers
				}
			};
		default:
			return state;
	}
}
