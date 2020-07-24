import * as deckActionTypes from '../actions/decks';

export default function decks(state = {}, action) {
	switch (action.type) {
		case deckActionTypes.GET_DECKS:
			return {
				...state,
				...action.decks
			};

		case deckActionTypes.ADD_DECK:
			const { deck } = action;
			return {
				...state,
				[deck]: []
			};
		default:
			return state;
	}
}
