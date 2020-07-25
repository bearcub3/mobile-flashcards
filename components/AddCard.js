import React, { useState, useRef } from 'react';
import { Text, View, Button, TextInput, TouchableOpacity, Alert, Picker } from 'react-native';
import styled from 'styled-components';
import { connect } from 'react-redux';
import RBSheet from 'react-native-raw-bottom-sheet';

import { Ionicons, EvilIcons } from '@expo/vector-icons';

import { colors } from '../utils/theme';
import { addCard } from '../actions/decks';
import { addCardData } from '../utils/api';

function AddCard({ entryId, dispatch }) {
	const [questionInput, setQuestion] = useState('');
	const [firstOption, setFirstOption] = useState('');
	const [secondOption, setSecondOption] = useState('');
	const [thirdOption, setThirdOption] = useState('');
	const [fourthOption, setFourthOption] = useState('');
	const [selectedValue, setSelectedValue] = useState(1);

	const [moreOption, setOption] = useState([
		firstOption,
		secondOption,
		thirdOption,
		fourthOption
	]);

	const checkInput = (param) => {
		if (param === 0) {
			return firstOption;
		}
		if (param === 1) {
			return secondOption;
		}
		if (param === 2) {
			return thirdOption;
		}
		if (param === 3) {
			return fourthOption;
		}
	};

	const checkOption = (index, text) => {
		if (index === 0) {
			return setFirstOption(text);
		}
		if (index === 1) {
			return setSecondOption(text);
		}
		if (index === 2) {
			return setThirdOption(text);
		}
		if (index === 3) {
			return setFourthOption(text);
		}
	};

	const submit = () => {
		dispatch(
			addCard(
				entryId,
				questionInput,
				[firstOption, secondOption, thirdOption, fourthOption],
				selectedValue - 1
			)
		);
		addCardData({
			entryId,
			question: questionInput,
			options: [firstOption, secondOption, thirdOption, fourthOption],
			answer: selectedValue - 1
		});
	};

	const refRBSheet = useRef();

	return (
		<Container>
			<Category>{entryId}</Category>
			<QuestionInput
				placeholder="Type a question"
				onChangeText={(text) => setQuestion(text)}
				value={questionInput}
			/>
			{moreOption.map((option, index) => (
				<Wrapper key={option + index}>
					<OptionInput
						placeholder="Add an option"
						value={checkInput(index)}
						onChangeText={(text) => checkOption(index, text)}
					/>
					<EvilIcons
						name="close-o"
						size={24}
						color="grey"
						onPress={() => {
							checkOption(index, '');
						}}
						style={{
							position: 'absolute',
							right: 10,
							opacity: checkInput(index).length > 0 ? 1 : 0
						}}
					/>
				</Wrapper>
			))}
			<PickerContainer>
				<Button
					title="Select the correct answer"
					onPress={() => refRBSheet.current.open()}
				/>
				<RBSheet
					ref={refRBSheet}
					closeOnDragDown={true}
					closeOnPressMask={false}
					customStyles={{
						wrapper: {
							backgroundColor: 'transparent'
						},
						draggableIcon: {
							backgroundColor: '#000'
						}
					}}
				>
					<AnswerPicker
						selectedValue={selectedValue}
						onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
					>
						<AnswerPicker.Item label="1" value="1" />
						<AnswerPicker.Item label="2" value="2" />
						<AnswerPicker.Item label="3" value="3" />
						<AnswerPicker.Item label="4" value="4" />
					</AnswerPicker>
				</RBSheet>
			</PickerContainer>
			<View
				style={{
					flexDirection: `row`
				}}
			>
				<Buttons onPress={submit}>
					<ButtonWrapper color={colors.black}>
						<Ionicons name="ios-send" size={24} color={`${colors.white}`} />
						<Text style={{ color: `${colors.white}`, marginLeft: 10 }}>Submit</Text>
					</ButtonWrapper>
				</Buttons>
			</View>
		</Container>
	);
}

const Container = styled.View`
	flex: 1;
	justify-content: center;
	align-items: center;
	background-color: ${colors.yellow};
`;

const Category = styled.Text`
	font-size: 35px;
	font-weight: bold;
`;

const QuestionInput = styled.TextInput`
	margin: 20px;
	padding: 15px;
	font-size: 16px;
	background-color: ${colors.white};
	width: 80%;
	border-radius: 30px;
`;

const Wrapper = styled.View`
	flex-direction: row;
	width: 80%;
	align-items: center;
	margin-bottom: 10px;
	position: relative;
`;

const OptionInput = styled.TextInput`
	flex: 2;
	padding: 15px;
	font-size: 16px;
	background-color: ${colors.white};
	border-radius: 30px;
`;

const Buttons = styled.TouchableOpacity`
	width: 50%;
`;

const ButtonWrapper = styled.View`
	flex-direction: row;
	width: 100%;
	background-color: ${(props) => props.color};
	border-radius: 10px;
	padding: 10px 25px;
	align-items: center;
	margin-top: 15px;
	justify-content: center;
`;

const PickerContainer = styled.View`
	align-items: center;
	justify-content: center;
	height: 50px;
`;

const AnswerPicker = styled.Picker`
	justify-content: center;
`;

function mapStateToProps({ decks, user }, { route }) {
	const { entryId } = route.params;
	return {
		entryId
	};
}

export default connect(mapStateToProps)(AddCard);
