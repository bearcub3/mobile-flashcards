import React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

function AddDeck() {
	return (
		<CardWrapper>
			<Title>Add Deck</Title>
		</CardWrapper>
	);
}

const CardWrapper = styled.View`
	height: 200;
	border-radius: 10;
	background-color: #ffc42d;
	align-items: center;
	justify-content: center;
	margin-bottom: 30;
`;

const Title = styled.Text`
	font-family: 'Roboto-Regular';
	color: #2f3061;
	font-size: 30;
`;

export default AddDeck;
