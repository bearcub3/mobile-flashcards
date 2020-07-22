import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { submitNewDeck } from '../utils/api';
import { addDeck } from '../actions/decks';

import { colors } from '../utils/theme';

const SubmitBtn = ({ onPress }) => (
	<SubmitButton onPress={onPress}>
		<BtnText>SUBMIT</BtnText>
	</SubmitButton>
);

function AddDeck({ dispatch }) {
	const [value, setValue] = useState('');
	const entry = new Array(1);

	const submit = () => {
		dispatch(addDeck(value));
		submitNewDeck({ entry, value });
		Alert.alert(
			'Add a Deck',
			`${value} has been added to the decks`,
			[{ text: 'OK', onPress: () => setValue('') }],
			{ cancelable: false }
		);
	};

	return (
		<CardWrapper>
			<Title>Add A Deck</Title>
			<Context>Name a techstack</Context>
			<Context>you'd like to create quizzes!</Context>
			<Input onChangeText={(text) => setValue(text)} value={value}></Input>
			<SubmitBtn onPress={submit} />
		</CardWrapper>
	);
}

const CardWrapper = styled.View`
	flex: 1;
	border-radius: 10;
	background-color: ${colors.yellow};
	align-items: center;
	justify-content: center;
`;

const Title = styled.Text`
	color: ${colors.black};
	font-size: 45;
	font-weight: bold;
	margin-bottom: 20;
`;

const Context = styled.Text`
	font-size: 18;
	text-align: center;
`;

const Input = styled.TextInput`
	background-color: ${colors.white};
	width: 350;
	padding-top: 10;
	padding-bottom: 10;
	padding-left: 10;
	padding-right: 10;
	margin-top: 20;
	margin-bottom: 50;
`;

const SubmitButton = styled.TouchableOpacity`
	background-color: ${colors.blue};
	padding-top: 20;
	padding-bottom: 20;
	padding-left: 50;
	padding-right: 50;
	border-radius: 7;
	margin-left: 40;
	margin-right: 40;
`;

const BtnText = styled.Text`
	color: ${colors.white};
	font-size: 20;
`;
export default connect()(AddDeck);
