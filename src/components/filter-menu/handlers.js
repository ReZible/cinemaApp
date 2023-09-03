import { useDispatch } from 'react-redux';
import {
	setGenres,
	setRangeOfYears,
	setSearchByName,
	setSortBy,
	resetFilters,
} from '../../store/reducers/filters-reducer';
import { resetPagination as resetPaginationAction } from '../../store/reducers/pagination-reducers';

function handles() {
	const dispatch = useDispatch();

	function resetPagination() {
		dispatch(resetPaginationAction());
	}
	function handleGenresChange(genres) {
		dispatch(setGenres(genres));
		resetPagination();
	}

	function handleSearchByNameChange(name) {
		dispatch(setSearchByName(name));
		resetPagination();
	}

	function handleSortByChange(value) {
		dispatch(setSortBy(value));
		resetPagination();
	}

	function handleRangeOfYearsChange(value) {
		dispatch(setRangeOfYears(value));
		resetPagination();
	}

	function handleResetClick() {
		dispatch(resetFilters());
		resetPagination();
	}

	function handleSubmit(e) {
		e.preventDefault();
	}

	return {
		handleGenresChange,
		handleResetClick,
		handleRangeOfYearsChange,
		handleSortByChange,
		handleSearchByNameChange,
		handleSubmit,
	};
}

export { handles };
