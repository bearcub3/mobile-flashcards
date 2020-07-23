/* @flow */
import { _getDecksData, _getUsersData, _saveUserAnswer } from './data';
import { AsyncStorage } from 'react-native';

export const DEV_QUIZ_STORAGE_KEY: string = 'DEV_QUIZ:QUIZZES';
export const USER_RECORD_STORAGE_KEY: string = 'USER_RECORD_STORAGE_KEY';

export function getInitalData() {
	return Promise.all([_getDecksData(), _getUsersData()]).then(([decks, user]) => ({
		decks,
		user
	}));
}

export function saveUserAnswer(info: { category: string, userAnswers: number }) {
	return _saveUserAnswer(info);
}

export function setBasicDecks(decks: { [string]: Array<any>, ... }) {
	return AsyncStorage.setItem(DEV_QUIZ_STORAGE_KEY, JSON.stringify(decks));
}

export function setUserRecord(user: { [string]: { userAnswers: Array<number> } }) {
	return AsyncStorage.setItem(USER_RECORD_STORAGE_KEY, JSON.stringify(user));
}

export function fetchDecksData() {
	return AsyncStorage.getItem(DEV_QUIZ_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results);
		return data;
	});
}

export function fetchUserData() {
	return AsyncStorage.getItem(USER_RECORD_STORAGE_KEY).then((results) => {
		const data = JSON.parse(results);
		return data;
	});
}

export function submitNewDeck({ entry, key }: { entry: Array<any>, key: string }) {
	return AsyncStorage.mergeItem(
		DEV_QUIZ_STORAGE_KEY,
		JSON.stringify({
			[key]: [entry]
		})
	);
}

export function submitUserAnswer({ entry, key }: { entry: number, key: string }) {
	return AsyncStorage.mergeItem(
		USER_RECORD_STORAGE_KEY,
		JSON.stringify({
			[key]: [entry]
		})
	);
}

// export function addCardData({ entry, key }) {
// 	return AsyncStorage.mergeItem(
// 		DEV_QUIZ_STORAGE_KEY,
// 		JSON.stringify({
// 			[key]: entry
// 		})
// 	);
// }
