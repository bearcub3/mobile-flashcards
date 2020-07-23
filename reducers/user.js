/* @flow */
import * as userActionTypes from '../actions/user';

type State = {
	user: { [string]: Array<number> },
	category: string,
	userAnswers: number
};

const initialDeckState = {};

export default function user(state: State = initialDeckState, action: Object) {
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
		default:
			return state;
	}
}
