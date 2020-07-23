// @flow
import { saveUserAnswer } from '../utils/api';

export const GET_USER: string = 'GET_USER';
export const SUBMIT_USER_ANSWER: string = 'SUBMIT_USER_ANSWER';

type GetUserRecordAction = {
	type: string,
	user: { [string]: { userAnswers: Array<number> } }
};

type SubmitUserAnswerAction = {
	type: string,
	category: string,
	userAnswers: number
};

export function getUserRecord(user: {
	[string]: { userAnswers: Array<number> }
}): GetUserRecordAction {
	return {
		type: GET_USER,
		user
	};
}

function submitUserAnswer({
	category,
	userAnswers
}: {
	category: string,
	userAnswers: number
}): SubmitUserAnswerAction {
	return {
		type: SUBMIT_USER_ANSWER,
		category,
		userAnswers
	};
}

export function handleSaveUserAnswer(info: { category: string, userAnswers: number }) {
	return (dispatch: Function) => {
		dispatch(submitUserAnswer(info));
		return saveUserAnswer(info);
	};
}
