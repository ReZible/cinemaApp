/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialModal = {
	activeModal: null,
};

const MODALS = {
	AUTHORIZATION: 'authorization',
};
const modalSlice = createSlice({
	name: 'filters',
	initialState: initialModal,
	reducers: {
		setActiveModal(state, action) {
			state.activeModal = action.payload;
		},
		resetModal() {
			return initialModal;
		},
	},
});

const { actions, reducer } = modalSlice;

export const { setActiveModal, resetModal } = actions;

export { reducer as modalsReducer, MODALS };
