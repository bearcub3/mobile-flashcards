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
			<TouchableOpacity
				onPress={() =>
					navigate('AddCard', {
						entryId: entryId
					})
				}
			>
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
	font-size: 50px;
	font-family: 'Roboto-Bold';
	color: ${colors.blue};
	margin-bottom: 20px;
`;

const TotalNumber = styled.Text`
	font-size: 20px;
`;

const Button = styled.View`
	align-items: center;
	background-color: ${(props) => props.color};
	border-radius: 10px;
	padding: 20px 40px;
	margin-top: 20px;
`;

const ButtonText = styled.Text`
	color: ${colors.white};
	font-size: 20px;
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
