/* @flow */
export const GET_DECKS: string = 'GET_DECKS';
export const ADD_DECK: string = 'ADD_DECK';

type GetUserDecksAction = {
	type: string,
	decks: { [string]: Array<any>, ... }
};

type AddDeckAction = {
	type: string,
	deck: string
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
