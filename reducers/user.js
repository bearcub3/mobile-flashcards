import { GET_USER, SUBMIT_USER_ANSWER } from '../actions/user';

export default function user(state = {}, action) {
	switch (action.type) {
		case GET_USER:
			return {
				...state,
				...action.user
			};
		case SUBMIT_USER_ANSWER:
			return {
				...state,
				[action.category]: {
					...state[action.category],
					userAnswers: state[action.category].userAnswers.concat([action.userAnswers])
				}
			};
		default:
			return state;
	}
}
