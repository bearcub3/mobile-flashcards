import { GET_DECKS, ADD_DECK } from '../actions/decks';

export default function decks(state = {}, action) {
	switch (action.type) {
		case GET_DECKS:
			return {
				...state,
				...action.decks
			};

		case ADD_DECK:
			const { deck } = action;
			return {
				...state,
				[deck]: []
			};
		default:
			return state;
	}
}
