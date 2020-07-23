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
			<Input onChangeText={(text: string) => setValue(text)} value={value}></Input>
			<SubmitBtn onPress={submit} />
		</CardWrapper>
	);
}

const CardWrapper = styled.View`
	flex: 1;
	border-radius: 10px;
	background-color: ${colors.yellow};
	align-items: center;
	justify-content: center;
`;

const Title = styled.Text`
	color: ${colors.black};
	font-size: 45px;
	font-weight: bold;
	margin-bottom: 20px;
`;

const Context = styled.Text`
	font-size: 18px;
	text-align: center;
`;

const Input = styled.TextInput`
	background-color: ${colors.white};
	width: 350px;
	padding: 10px;
	margin-top: 20px;
	margin-bottom: 50px;
`;

const SubmitButton = styled.TouchableOpacity`
	background-color: ${colors.blue};
	padding: 20px 50px;
	border-radius: 7px;
	margin: 0 40px;
`;

const BtnText = styled.Text`
	color: ${colors.white};
	font-size: 20px;
`;
export default connect()(AddDeck);
