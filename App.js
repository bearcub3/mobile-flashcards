import React from 'react';
import { Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';

import reducer from './reducers';
import middlewares from './middlewares';

import AppEntry from './components/AppEntry';

const store = createStore(reducer, middlewares);

const Container = styled.View`
	flex: 1;
	flex-flow: row wrap;
	justify-content: flex-start;
`;

function App() {
	return (
		<Provider store={store}>
			<AppEntry />
		</Provider>
	);
}

export default App;
