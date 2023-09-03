/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import uniqid from 'uniqid';

const initialSimpleAlert = {
	alerts: [],
};

const simpleAlertSlice = createSlice({
	name: 'error',
	initialState: initialSimpleAlert,
	reducers: {
		addAlert: (state, action) => {
			state.alerts.push({
				id: uniqid(),
				title: action.payload.title,
				message: action.payload.message,
				severity: action.payload.severity,
			});
		},
		clearListAlerts: () => initialSimpleAlert,
		deleteAlert: (state, action) => {
			state.alerts = state.alerts.filter(
				(alert) => alert.id !== action.payload,
			);
		},
	},
});

const { actions, reducer } = simpleAlertSlice;

export const { addAlert, clearListAlerts, deleteAlert } = actions;

export { reducer as simpleAlertReducer };
