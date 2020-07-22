import React, { useState, useEffect } from 'react';
import { Text, View, TouchableHighlight, Alert, Modal } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { colors } from '../utils/theme';

function QuizResult({ modalVisible, handleModal, category, totalScore, totalCards }) {
	const scoreCalculation = () => {
		return (100 / totalCards) * totalScore;
	};
	const [userScore, setScore] = useState(scoreCalculation());

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
						<CloseBTN
							onPress={() => {
								handleModal(false);
							}}
						>
							<Text style={{ color: `${colors.white}`, fontSize: `20` }}>
								Close Modal
							</Text>
						</CloseBTN>
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
	border-radius: 10;
	padding-top: 20;
	padding-bottom: 20;
	padding-left: 20;
	padding-right: 20;
	align-items: center;
	elevation: 5;
`;

const Title = styled.Text`
	font-size: 60;
	font-weight: bold;
	margin-bottom: 50;
`;

const ScoreBG = styled.View`
	background-color: ${colors.blue};
	border-radius: 270;
	width: 270;
	height: 270;
	justify-content: center;
	align-items: center;
	margin-bottom: 50;
`;

const Score = styled.Text`
	font-family: 'Roboto-Regular';
	letter-spacing: -3;
	font-size: 100;
	color: ${colors.white};
`;

const GradeRemark = styled.Text`
	font-size: 40;
`;

const Remark = styled.Text`
	font-size: 30;
`;

const CloseBTN = styled.TouchableHighlight`
	width: 150;
	background-color: ${colors.black};
	color: ${colors.white};
	align-items: center;
	padding-top: 20;
	padding-bottom: 20;
	border-radius: 10;
	margin-top: 30;
`;

function mapStateToProps({ decks, user }, { category }) {
	const userAnswer = user[category];
	const correctAnswer = decks[category].map((item) => item.answer);
	return {
		totalScore: correctAnswer.filter((a, idx) => userAnswer[idx] !== a).length,
		totalCards: correctAnswer.length
	};
}

export default connect(mapStateToProps)(QuizResult);
