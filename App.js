/* @flow */
import React from 'react';
import { Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import styled from 'styled-components/native';

import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import reducer from './reducers';
import middlewares from './middlewares';

import AppEntry from './components/AppEntry';

const store = createStore<Object, any, any>(reducer, middlewares);

const Container = styled.View`
	flex: 1;
	flex-flow: row wrap;
	justify-content: flex-start;
`;

function App() {
	let [fontsLoaded] = useFonts<string | Object>({
		'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf')
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<Provider store={store}>
			<Container>
				<AppEntry />
			</Container>
		</Provider>
	);
}

export default App;
