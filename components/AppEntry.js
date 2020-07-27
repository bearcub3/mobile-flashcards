import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Text, View, SafeAreaView, StatusBar, Platform, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { AppLoading } from 'expo';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { setBasicDecks, fetchDecksData, setUserRecord, fetchUserData } from '../utils/api';
import { handleUsersData } from '../actions';
import { colors } from '../utils/theme';

import Decks from './Decks';
import AddDeck from './AddDeck';
import CardDetail from './CardDetail';
import Quiz from './Quiz';
import AddCard from './AddCard';

// StatusBar
const FlashCardStatusBar = ({ backgroundColor, ...props }) => (
	<SafeAreaView style={{ backgroundColor, height: Constants.StatusBarHeight }}>
		<StatusBar translucent backgroundColor={backgroundColor} {...props} />
	</SafeAreaView>
);

//Bottom Tab Navigation
const TabType =
	Platform.OS === 'ios' ? createBottomTabNavigator() : createMaterialTopTabNavigator();

const TabNavigation = () => (
	<TabType.Navigator
		initialRouteName="Decks"
		screenOptions={({ route }) => ({
			tabBarIcon: ({ color, size }) => {
				let icon;

				route.name === 'Decks'
					? (icon = (
							<MaterialCommunityIcons
								name="cards-outline"
								size={size}
								color={color}
							/>
					  ))
					: (icon = <MaterialIcons name="add" color={color} size={size} />);

				return icon;
			}
		})}
		tabBarOptions={{
			activeTintColor: colors.white,
			style: {
				height: 50,
				backgroundColor: colors.black,
				shadowColor: 'rgba(0, 0, 0, 0.3)',
				shadowOffset: {
					width: 1,
					height: 3
				},
				shadowRadius: 5,
				shadowOpacity: 1
			},
			labelPosition: 'beside-icon'
		}}
	>
		<TabType.Screen name="Decks" component={Decks} size={30} />
		<TabType.Screen name="Add A Deck" component={AddDeck} size={30} />
	</TabType.Navigator>
);

// Stack Navigation
const Stack = createStackNavigator();

const CardStackNav = () => (
	<Stack.Navigator headerMode="screen">
		<Stack.Screen name="Decks" component={TabNavigation} options={{ headerShown: false }} />
		<Stack.Screen
			name="CardDetail"
			component={CardDetail}
			options={{
				headerTintColor: colors.white,
				headerStyle: { backgroundColor: colors.black }
			}}
		/>
		<Stack.Screen
			name="AddCard"
			component={AddCard}
			options={{
				headerTintColor: colors.white,
				headerStyle: { backgroundColor: colors.black }
			}}
		/>
		<Stack.Screen
			name="StartQuiz"
			component={Quiz}
			options={{
				headerTintColor: colors.white,
				headerStyle: { backgroundColor: colors.black }
			}}
		/>
	</Stack.Navigator>
);

function AppEntry({ dispatch, decks, user }: Function) {
	let [fontsLoaded] = useFonts({
		'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
		'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
		'Roboto-Light': require('../assets/fonts/Roboto-Light.ttf')
	});

	useEffect(() => {
		fetchDecksData();
		fetchUserData();
		setBasicDecks({ decks });
		setUserRecord({ user });
		dispatch(handleUsersData());
	}, [decks, user]);

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<NavigationContainer>
			<FlashCardStatusBar backgroundColor={colors.black} barStyle="light-content" />
			<CardStackNav />
		</NavigationContainer>
	);
}

export default connect()(AppEntry);
