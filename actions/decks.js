/* @flow */
export const GET_DECKS: string = 'GET_DECKS';
export const ADD_DECK: string = 'ADD_DECK';
export const ADD_CARD: string = 'ADD_CARD';

type GetUserDecksAction = {
	type: string,
	decks: { [string]: Array<any>, ... }
};

type AddDeckAction = {
	type: string,
	deck: string
};

type AddCardAction = {
	type: string,
	category: string,
	question: string,
	options: Array<any>
};

export function getUserDecks(decks: { [string]: Array<any>, ... }): GetUserDecksAction {
	return {
		type: GET_DECKS,
		decks
	};
}

export function addDeck(deck: string): AddDeckAction {
	return {
		type: ADD_DECK,
		deck
	};
}

export function addCard(
	category: string,
	question: string,
	options: Array<any>,
	answer: number
): AddCardAction {
	return {
		type: ADD_CARD,
		category,
		question,
		options,
		answer
	};
}
