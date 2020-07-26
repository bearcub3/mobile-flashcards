import React from 'react';
import { View, AsyncStorage } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

const NOTIFICATION_KEY = 'DEVquiz:notifications';

export function setLocalNotification() {
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			console.log('CHECKING IF THE DATA DOES EXIST', data);
			if (data === null) {
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					console.log('WHAT STATUS I AM IN', status);
					if (status === 'granted') {
						Notifications.cancelAllScheduledNotificationsAsync();

						let tomorrow = new Date();
						tomorrow.setDate(tomorrow.getDate() + 1);
						tomorrow.setHours(9);
						tomorrow.setMinutes(0);

						Notifications.scheduleNotificationAsync({
							content: {
								title: 'Come join the dev quiz!',
								body: 'Take you dev knowledge to the net level!'
							},
							ios: {
								sound: true
							},
							android: {
								sound: true
							},
							trigger: {
								time: tomorrow,
								repeats: true
							}
						});

						AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
					}
				});
			}
		});
}

export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
		Notifications.cancelAllScheduledNotificationsAsync
	);
}
