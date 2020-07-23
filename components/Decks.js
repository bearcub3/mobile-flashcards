import React, { useEffect } from 'react';
import { Text, View, ScrollView, AsyncStorage } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from '../utils/theme';
import { setBasicDecks, fetchDecksData, setUserRecord, fetchUserData } from '../utils/api';

function Decks({ totalDecks, decks, user, navigation: { navigate } }) {
	useEffect(() => {
		setBasicDecks({ decks });
		fetchDecksData();
		setUserRecord({ user });
		fetchUserData();
	}, [decks, user]);

	return (
		<ScrollView style={{ backgroundColor: `${colors.white}` }} stickyHeaderIndices={[0]}>
			<Landing>
				<Intro>Dev Quiz</Intro>
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
	padding-top: 10px;
	align-items: center;
	background-color: ${colors.black};
	height: 220px;
`;

const Header = styled.Text`
	font-family: 'Roboto-Regular';
	font-size: 15px;
	color: ${colors.white};
`;

const Intro = styled.Text`
	font-family: 'Roboto-Bold';
	font-size: 60px;
	color: ${colors.white};
	padding-top: 50px;
	padding-bottom: 10px;
`;

const DeckContainer = styled.View`
	margin-top: 50px;
	margin-left: 30px;
	margin-right: 30px;
`;

const TotalDecks = styled.Text`
	margin-bottom: 15px;
	font-size: 17px;
	color: ${colors.black};
`;

const Card = styled.TouchableOpacity`
	height: 200px;
	border-radius: 10px;
	background-color: ${colors.blue};
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
	shadow-opacity: 0.5;
	shadow-radius: 3px;
	shadow-color: ${colors.black};
	shadow-offset: 3px 4px;
`;

const Title = styled.Text`
	font-family: 'Roboto-Regular';
	color: ${colors.yellow};
	font-size: 40px;
	margin-bottom: 10px;
`;

const CardsNumber = styled.Text`
	color: ${colors.white};
	font-size: 20px;
`;

const Bold = styled.Text`
	font-weight: bold;
`;

function mapStateToProps({ decks, user }) {
	return {
		decks,
		user,
		totalDecks: Object.keys(decks)
	};
}

export default connect(mapStateToProps)(Decks);
