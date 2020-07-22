import React, { useRef, useState, useEffect } from 'react';
import {
	Text,
	View,
	TouchableOpacity,
	TouchableHighlight,
	Alert,
	Dimensions,
	Modal
} from 'react-native';
import { connect } from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import styled from 'styled-components';

import { colors } from '../utils/theme';
import { handleSaveUserAnswer } from '../actions/user';
import { submitUserAnswer } from '../utils/api';

import QuizResult from './QuizResult';

function Quiz({ dispatch, deck, category, answered }) {
	const screenWidth = Math.round(Dimensions.get('window').width);
	const carousel = useRef();
	const [currentCategory] = useState(category);
	const [modalVisible, setModalVisible] = useState(false);

	const handleModalVisiblity = (param) => {
		setModalVisible(param);
	};

	const [isCompleted, setCompletion] = useState(false);

	const QuizDeck = ({ item, index }) => (
		<Wrapper>
			<Pagination>
				Total <Bold>{index + 1}</Bold> of {deck.length} cards
			</Pagination>
			<QuestionTitle>Question</QuestionTitle>
			<QuestionText>{item.question}</QuestionText>
			{item.options.map((option, idx) => (
				<Options
					key={option.question}
					disabled={
						(answered[index] !== undefined && true) || (answered[index] > idx && false)
					}
					onPress={() => {
						if (answered.length !== index) {
							Alert.alert(
								`Answer the previous quiz first!`,
								``,
								[
									{
										text: 'OK',
										onPress: () => {
											carousel.current.snapToPrev();
										}
									}
								],
								{ cancelable: false }
							);
							return;
						}

						dispatch(
							handleSaveUserAnswer({
								category: currentCategory,
								userAnswers: idx
							})
						);
						submitUserAnswer({ currentCategory, idx });

						if (deck.length === answered.length + 1) {
							setCompletion(!isCompleted);
							handleModalVisiblity(!modalVisible);
							return;
						}

						carousel.current.snapToNext();
					}}
					style={answered[index] === idx && { backgroundColor: `${colors.yellow}` }}
				>
					<Text style={{ fontSize: 16 }}>{option}</Text>
				</Options>
			))}
			<Answer
				disabled={isCompleted}
				onPress={() => {
					const hasChecked = 5;
					if (answered.length !== index) {
						Alert.alert(
							`Answer the previous quiz first!`,
							``,
							[
								{
									text: 'OK',
									onPress: () => {
										carousel.current.snapToPrev();
									}
								}
							],
							{ cancelable: false }
						);
						return;
					}

					Alert.alert(
						`${item.answer + 1}`,
						`The correct answer`,
						[
							{
								text: 'OK',
								onPress: () => {
									if (answered[index]) {
										carousel.current.snapToNext();
										return;
									}
									dispatch(
										handleSaveUserAnswer({
											category: currentCategory,
											userAnswers: hasChecked
										})
									);
									submitUserAnswer({ currentCategory, hasChecked });
									carousel.current.snapToNext();
								}
							}
						],
						{ cancelable: false }
					);
				}}
			>
				<AnswerText>Show Answer</AnswerText>
			</Answer>
		</Wrapper>
	);

	return (
		<Container>
			<Carousel
				ref={carousel}
				data={deck}
				renderItem={QuizDeck}
				sliderWidth={screenWidth}
				itemWidth={screenWidth - 50}
				layout={'default'}
				layoutCardOffset={15}
			/>
			<QuizResult
				category={category}
				handleModal={handleModalVisiblity}
				modalVisible={modalVisible}
			/>
		</Container>
	);
}

function mapStateToProps({ decks, user }, { route }) {
	const { entryId, handleModal, modalVisible } = route.params;
	return {
		category: entryId,
		deck: decks[entryId],
		answered: user[entryId].userAnswers,
		handleModal,
		modalVisible
	};
}

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	flex-direction: row;
`;

const Wrapper = styled.View`
	background-color: ${colors.black};
	padding-top: 30;
	padding-bottom: 30;
	padding-left: 30;
	padding-right: 30;
	border-radius: 20;
	height: 600;
`;

const Pagination = styled.Text`
	font-size: 15;
	margin-bottom: 20;
	color: ${colors.white};
`;

const Bold = styled.Text`
	font-weight: bold;
`;

const QuestionTitle = styled.Text`
	font-size: 30;
	font-family: 'Roboto-Bold';
	color: ${colors.white};
	margin-bottom: 10;
`;

const QuestionText = styled.Text`
	font-size: 20;
	font-weight: bold;
	color: ${colors.white};
	margin-bottom: 30;
`;

const Options = styled.TouchableOpacity`
	background-color: ${colors.grey};
	padding-top: 15;
	padding-bottom: 15;
	padding-left: 15;
	padding-left: 15;
	margin-bottom: 15;
	border-radius: 10;
`;

const Answer = styled.TouchableOpacity`
	align-self: center;
	width: 300;
	background-color: ${colors.blue};
	padding-top: 15;
	padding-bottom: 15;
	margin-bottom: 15;
	border-radius: 10;
`;

const AnswerText = styled.Text`
	font-size: 15;
	text-align: center;
	color: ${colors.white};
`;

export default connect(mapStateToProps)(Quiz);
