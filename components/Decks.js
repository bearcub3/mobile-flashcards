import React from 'react';
import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from '../utils/theme';

function Decks({ totalDecks, decks, navigation: { navigate } }) {
	return (
		<ScrollView style={{ backgroundColor: `${colors.white}` }} stickyHeaderIndices={[0]}>
			<Landing>
				<Intro> Dev Quiz</Intro>
				<Header>Take your dev knowledge to the next level!</Header>
			</Landing>
			<DeckContainer>
				<TotalDecks>
					Total <Bold>{totalDecks.length}</Bold> Decks
				</TotalDecks>
				{totalDecks.map((deck) => (
					<Card key={deck} onPress={() => navigate('CardDetail', { entryId: deck })}>
						<Title>{deck}</Title>
						<CardsNumber>
							You have <Bold>{decks[deck].length}</Bold> cards.
						</CardsNumber>
					</Card>
				))}
			</DeckContainer>
		</ScrollView>
	);
}

const Landing = styled.View`
	padding-top: 10;
	align-items: center;
	background-color: ${colors.black};
	height: 220;
`;

const Header = styled.Text`
	font-family: 'Roboto-Regular';
	font-size: 15;
	color: ${colors.white};
`;

const Intro = styled.Text`
	font-family: 'Roboto-Bold';
	font-size: 60;
	color: ${colors.white};
	padding-top: 50;
	padding-bottom: 10;
`;

const DeckContainer = styled.View`
	margin-top: 50;
	margin-left: 30;
	margin-right: 30;
`;

const TotalDecks = styled.Text`
	margin-bottom: 15;
	font-size: 17;
	color: ${colors.black};
`;

const Card = styled.TouchableOpacity`
	height: 200;
	border-radius: 10;
	background-color: ${colors.blue};
	align-items: center;
	justify-content: center;
	margin-bottom: 30;
	shadow-opacity: 0.5;
	shadow-radius: 3;
	shadow-color: ${colors.black};
	shadow-offset: 3px 4px;
`;

const Title = styled.Text`
	font-family: 'Roboto-Regular';
	color: ${colors.yellow};
	font-size: 40;
	margin-bottom: 10;
`;

const CardsNumber = styled.Text`
	color: ${colors.white};
	font-size: 20;
`;

const Bold = styled.Text`
	font-weight: bold;
`;

function mapStateToProps({ decks }) {
	return {
		decks,
		totalDecks: Object.keys(decks)
	};
}

// function mapDispatchToProps(dispatch, { route, navigation }) {
// 	const { entryId } = route.params;

// 	return {
// 		goBack: () => navigation.goBack
// 	};
// }

export default connect(mapStateToProps)(Decks);
