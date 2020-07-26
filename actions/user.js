// @flow
import { saveUserAnswer, resetUserAnswers } from '../utils/api';

export const GET_USER: string = 'GET_USER';
export const SUBMIT_USER_ANSWER: string = 'SUBMIT_USER_ANSWER';
export const RESET_USER_ANSWER: string = 'RESET_USER_ANSWER';

type GetUserRecordAction = {
	type: string,
	user: { [string]: { userAnswers: Array<number> } }
};

type SubmitUserAnswerAction = {
	type: string,
	category: string,
	userAnswers: number
};

type ResetUserAnswerAction = {
	type: string,
	category: string,
	userAnswers: any
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

function resetUserAnswer({
	category,
	userAnswers
}: {
	category: string,
	userAnswers: any
}): ResetUserAnswerAction {
	return {
		type: RESET_USER_ANSWER,
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

export function handleResetUserAnswer(info: { category: string, userAnswers: any }) {
	return (dispatch: Function) => {
		dispatch(resetUserAnswer(info));
		return resetUserAnswers(info);
	};
}
