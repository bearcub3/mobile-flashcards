export const GET_DECKS = 'GET_DECKS';
export const ADD_DECK = 'ADD_DECK';

export function getUserDecks(decks) {
	return {
		type: GET_DECKS,
		decks
	};
}

export function addDeck(deck) {
	console.log(deck);
	return {
		type: ADD_DECK,
		deck
	};
}
