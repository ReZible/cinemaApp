/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialPagination = {
	page: 1,
	total_pages: null,
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState: initialPagination,
	reducers: {
		setPaginationTotalPages(state, action) {
			state.total_pages = action.payload;
		},
		setPaginationCurrentPage(state, action) {
			state.page = action.payload;
		},
		resetPagination() {
			return initialPagination;
		},
	},
});

const { actions, reducer } = paginationSlice;

export const {
	setPaginationCurrentPage,
	setPaginationTotalPages,
	resetPagination,
} = actions;

export { reducer as paginationReducer };
