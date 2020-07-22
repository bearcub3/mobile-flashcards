import React, { useRef } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { colors } from '../utils/theme';

// Stack Navigation
function CardDetail({ entryId, decks, resumePoint, navigation: { navigate } }) {
	const currentValue = useRef();

	return (
		<Container>
			<CardCategory>{entryId}</CardCategory>
			<TotalNumber>
				You have total <BoldText>{decks[entryId].length}</BoldText> cards.
			</TotalNumber>
			<TouchableOpacity onPress={() => navigate('AddCard')}>
				<Button color={colors.black}>
					<ButtonText>Add Card</ButtonText>
				</Button>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={() =>
					navigate('StartQuiz', {
						entryId: entryId
					})
				}
			>
				<Button color={colors.blue}>
					<ButtonText ref={currentValue}>
						{resumePoint > 0
							? resumePoint === decks[entryId].length
								? 'View Result'
								: 'Resume Quiz'
							: 'Start Quiz'}
					</ButtonText>
				</Button>
			</TouchableOpacity>
		</Container>
	);
}

const Container = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const CardCategory = styled.Text`
	font-size: 50;
	font-family: 'Roboto-Bold';
	color: ${colors.blue};
	margin-bottom: 20;
`;

const TotalNumber = styled.Text`
	font-size: 20;
`;

const Button = styled.View`
	align-items: center;
	background-color: ${(props) => props.color};
	border-radius: 10;
	padding-top: 20;
	padding-bottom: 20;
	padding-left: 40;
	padding-right: 40;
	margin-top: 20;
`;

const ButtonText = styled.Text`
	color: ${colors.white};
	font-size: 20;
`;

const BoldText = styled.Text`
	font-weight: bold;
`;

function mapStateToProps({ decks, user }, { route }) {
	const { entryId } = route.params;
	return {
		entryId,
		decks,
		resumePoint: user[entryId].userAnswers.length
	};
}

export default connect(mapStateToProps)(CardDetail);
