import React, { useState } from 'react';
import { Text, View, TouchableHighlight, Alert, Modal } from 'react-native';
import styled from 'styled-components';

import { colors } from '../utils/theme';

function QuizResult({ modalVisible, handleModal, category }) {
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
						<TouchableHighlight
							onPress={() => {
								handleModal(false);
							}}
						>
							<Text>Hide Modal</Text>
						</TouchableHighlight>
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
	font-size: 45;
`;

export default QuizResult;
