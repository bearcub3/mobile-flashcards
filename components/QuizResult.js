import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, Alert, Modal } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import { colors } from '../utils/theme';
import { handleSaveUserAnswer, handleResetUserAnswer } from '../actions/user';
import { submitUserAnswer, removeUserAnswer } from '../utils/api';

function QuizResult({
	dispatch,
	modalVisible,
	handleModal,
	category,
	totalScore,
	totalCards,
	handleGoBack,
	handleGoToDeck
}) {
	const scoreCalculation = () => {
		return (100 / totalCards) * totalScore;
	};

	const reset = () => {
		dispatch(
			handleResetUserAnswer({
				category: category,
				userAnswers: []
			})
		);
		removeUserAnswer(category);
	};

	const [userScore, setScore] = useState(scoreCalculation());

	useEffect(() => {
		setScore(scoreCalculation());
	}, [totalScore]);

	return (
		<Wrapper>
			<Modal
				animationType="slide"
				transparent={false}
				visible={modalVisible}
				onRequestClose={() => {
					Alert.alert('Modal has been closed.');
				}}
			>
				<ModalContainer>
					<ModalView>
						<Title>{category}</Title>
						<ScoreBG>
							<Score>{userScore}%</Score>
						</ScoreBG>
						<GradeRemark>
							{userScore > 75
								? 'Excellent!'
								: userScore > 50
								? 'Good Job'
								: 'Good Effort'}
						</GradeRemark>
						<Remark>{`You have got ${totalScore} out of ${totalCards}!!`}</Remark>
						<View
							style={{
								flexDirection: `row`
							}}
						>
							<BTN
								bgcolor={colors.darkPurple}
								onPress={() => {
									reset();
									handleGoBack();
								}}
							>
								<Text style={{ color: `${colors.white}`, fontSize: 17 }}>
									Restart
								</Text>
							</BTN>
							<BTN
								bgcolor={colors.grey}
								onPress={() => {
									handleModal(false);
									handleGoToDeck.navigate({ name: 'Decks' });
								}}
							>
								<Text style={{ color: `${colors.black}`, fontSize: 17 }}>
									Go to Decks
								</Text>
							</BTN>
						</View>
					</ModalView>
				</ModalContainer>
			</Modal>
		</Wrapper>
	);
}

const Wrapper = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const ModalContainer = styled.View`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const ModalView = styled.View`
	background-color: ${colors.white};
	border-radius: 10px;
	padding: 20px;
	align-items: center;
	elevation: 5;
`;

const Title = styled.Text`
	font-size: 60px;
	font-weight: bold;
	margin-bottom: 50px;
`;

const ScoreBG = styled.View`
	background-color: ${colors.blue};
	border-radius: 270px;
	width: 270px;
	height: 270px;
	justify-content: center;
	align-items: center;
	margin-bottom: 50px;
`;

const Score = styled.Text`
	font-family: 'Roboto-Regular';
	letter-spacing: -3px;
	font-size: 100px;
	color: ${colors.white};
`;

const GradeRemark = styled.Text`
	font-size: 40px;
`;

const Remark = styled.Text`
	font-size: 30px;
`;

const BTN = styled.TouchableHighlight`
	width: 150px;
	height: 60px;
	background-color: ${(props) => props.bgcolor};
	color: ${colors.white};
	align-items: center;
	padding-top: 20px;
	padding-bottom: 20px;
	border-radius: 10px;
	margin-top: 30px;
	margin-left: 10px;
`;

function mapStateToProps({ decks, user }, { category }) {
	const userAnswer = user[category].userAnswers;
	const correctAnswer = decks[category].map((item) => item.answer);

	return {
		totalScore: correctAnswer.filter((a, idx) => a == userAnswer[idx]).length,
		totalCards: correctAnswer.length
	};
}

export default connect(mapStateToProps)(QuizResult);
