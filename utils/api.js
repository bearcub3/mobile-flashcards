import { _getDecksData } from './data';

export function getUserDecksData() {
	return Promise.all([_getDecksData()]).then(([decks]) => ({
		decks
	}));
}
