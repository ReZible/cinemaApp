import { useEffect } from 'react';
import { Box, Paper, Typography, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useSelector, useDispatch } from 'react-redux';
import { handles } from './handlers';
import { SelectRangeOfYears } from './select-range-of-years/select-range-of-years';
import { SelectSortBy } from './select-sort-by/select-sort-by';
import { CheckBoxesGenres } from './check-box-genres/check-box-genres';
import { SearchByName } from './search-by-name/search-by-name';
import { useGetGenresQuery } from '../../services/api';
import { addAlert } from '../../store/reducers/simple-alert-reducer';

function FilterMenu() {
	const { data: genresData, isError: isErrorGenresData } =
		useGetGenresQuery();

	const filter = useSelector((store) => store.filter);
	const {
		searchByName: selectedName,
		rangeOfYears: selectedYearsRange,
		sortBy: selectedType,
		genres: selectedGenres,
	} = filter;
	const {
		handleGenresChange,
		handleResetClick,
		handleRangeOfYearsChange,
		handleSortByChange,
		handleSubmit,
		handleSearchByNameChange,
	} = handles();
	const dispatch = useDispatch();

	useEffect(() => {
		if (isErrorGenresData) {
			const errorTitle = `Ошибка жанров фильмов`;
			const errorMessage = `Произошла ошибка при получении данных с сервера`;
			const errorMsg = {
				title: errorTitle,
				message: errorMessage,
				severity: 'error',
			};

			dispatch(addAlert(errorMsg));
		}
	}, [isErrorGenresData]);

	return (
		<Box component='form' onSubmit={handleSubmit} sx={{ pt: '20px' }}>
			<Paper elevation={2} sx={{ p: '20px' }}>
				<FilterMenuHeader onResetClick={handleResetClick} />
				<SearchByName
					value={selectedName}
					onChange={handleSearchByNameChange}
				/>
				<SelectSortBy
					value={selectedType}
					onChange={handleSortByChange}
				/>
				<SelectRangeOfYears
					value={selectedYearsRange}
					onChange={handleRangeOfYearsChange}
				/>
				<CheckBoxesGenres
					value={selectedGenres}
					genresArray={genresData?.genres}
					onChange={handleGenresChange}
				/>
				<div
					id='error-place'
					style={{
						color: 'red',
						fontSize: '14px',
						marginTop: '10px',
						height: '20px',
					}}
				>
					{isErrorGenresData ? 'Произошла ошибка' : ''}
				</div>
			</Paper>
		</Box>
	);
}

function FilterMenuHeader({ onResetClick }) {
	return (
		<Box component='div'>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Typography
					variant='h5'
					component='div'
					sx={{ fontWeight: 'bold', flexGrow: 1 }}
				>
					Фильтры
				</Typography>
				<IconButton
					size='large'
					color='inherit'
					edge='end'
					onClick={onResetClick}
				>
					<ClearIcon
						fontSize='large'
						sx={{ color: 'rgba(0, 0, 0, 0.56);' }}
					/>
				</IconButton>
			</div>
		</Box>
	);
}

export { FilterMenu };
