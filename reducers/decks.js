/* @flow */
import * as deckActionTypes from '../actions/decks';

type State = {
	decks: { [string]: Array<any>, ... },
	deck: string
};

const initialDeckState = {};

export default function decks(state: State = initialDeckState, action: Object) {
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
