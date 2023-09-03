/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
	SORT_OPTIONS,
	DEFAULT_YEARS_RANGE,
} from '../../components/filter-menu/constants/filter-constants';

const initialFilters = {
	genres: [],
	sortBy: SORT_OPTIONS.POPULARITY_DESC.value,
	searchByName: '',
	rangeOfYears: DEFAULT_YEARS_RANGE,
};

const filtersSlice = createSlice({
	name: 'filters',
	initialState: initialFilters,
	reducers: {
		setSortBy(state, action) {
			state.sortBy = action.payload;
		},
		setRangeOfYears(state, action) {
			state.rangeOfYears = action.payload;
		},
		setGenres(state, action) {
			state.genres = action.payload;
		},
		setSearchByName(state, action) {
			state.searchByName = action.payload;
		},
		resetFilters() {
			return initialFilters;
		},
	},
});

const { actions, reducer } = filtersSlice;

export const {
	setGenres,
	setRangeOfYears,
	setSearchByName,
	setSortBy,
	resetFilters,
} = actions;

export { reducer as filtersReducer };
