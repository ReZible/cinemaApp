import { Typography, Pagination, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import uniqid from 'uniqid';
import { MovieCard } from '../movie-card/movie-card';
import {
	useGetFavoriteMoviesQuery,
	useGetListMoviesQuery,
} from '../../../services/api';
import { addAlert } from '../../../store/reducers/simple-alert-reducer';
import {
	setPaginationCurrentPage,
	setPaginationTotalPages,
} from '../../../store/reducers/pagination-reducers';
import { MovieCardSkeleton } from '../movie-card/movie-card-skeleton';

function MovieList() {
	const dispatch = useDispatch();
	const filters = useSelector((store) => store.filter);
	const userData = useSelector((store) => store.user);
	const paginationData = useSelector((store) => store.pagination);
	const { page: currentPage } = paginationData;
	const {
		data: favoriteMoviesData,
		isError: isErrorfavoriteMoviesData,
		isLoading: isLoadingFavoriteMoviesData,
	} = useGetFavoriteMoviesQuery(userData.accountId);
	const {
		data: moviesData,
		isError: isErrorMoviesData,
		isLoading: isLoagingMoviesData,
	} = useGetListMoviesQuery({
		filters,
		currentPage,
	});
	const isAnyQueryLoading =
		isLoadingFavoriteMoviesData || isLoagingMoviesData;
	const hasError = isErrorMoviesData || isErrorfavoriteMoviesData;
	const favoriteMovies = favoriteMoviesData?.results;
	const movies = moviesData?.results;

	useEffect(() => {
		if (isAnyQueryLoading || hasError) return;

		const { total_pages: totalPages } = moviesData;

		dispatch(setPaginationTotalPages(totalPages));

		window.scrollTo({ top: 0, behavior: 'smooth' });
	}, [moviesData, favoriteMoviesData]);

	useEffect(() => {
		if (hasError) {
			const errorTitle = `Ошибка фильмов`;
			const errorMessage = `Произошла ошибка при получении данных с сервера`;
			const errorMsg = {
				title: errorTitle,
				message: errorMessage,
				severity: 'error',
			};

			dispatch(addAlert(errorMsg));
		}
	}, [hasError]);

	return (
		<>
			<div
				style={{
					marginTop: '15px',
					display: 'flex',
					flexWrap: 'wrap',
					justifyContent: 'center',
					position: 'relative',
				}}
			>
				{isAnyQueryLoading
					? Array.from(new Array(20)).map(() => (
							<MovieCardSkeleton key={uniqid()} />
					  ))
					: ''}
				{hasError ? (
					<ShowMessage isError>Произошла ошибка</ShowMessage>
				) : (
					''
				)}
				{!isAnyQueryLoading && !hasError
					? movies.map((item) => {
							const newFavoriteMovies = favoriteMovies.filter(
								(favoriteMovie) => favoriteMovie.id === item.id,
							);

							if (newFavoriteMovies.length !== 0) {
								return (
									<MovieCard
										added
										key={item.id}
										movieData={item}
									/>
								);
							}
							return <MovieCard key={item.id} movieData={item} />;
					  })
					: ''}

				{}

				{movies?.length === 0 && (
					<ShowMessage>
						По вашему запросу ничего не найдено
					</ShowMessage>
				)}
			</div>
			<div>
				{movies?.length !== 0 && !isAnyQueryLoading && !hasError ? (
					<PaginationSection paginationData={paginationData} />
				) : (
					''
				)}
			</div>
		</>
	);
}

function ShowMessage({ children, isError = false }) {
	return (
		<Typography
			variant='h5'
			component='h2'
			sx={{
				color: `${isError ? 'red' : 'black'}`,
			}}
		>
			{children}
		</Typography>
	);
}

function PaginationSection({ paginationData }) {
	const dispatch = useDispatch();
	const maxPages = 500;
	const isSmallerThan900 = useMediaQuery('(max-width:900px)');
	const { page: currentPage, total_pages: totalPages } = paginationData;

	function handleChangePagination(event, value) {
		dispatch(setPaginationCurrentPage(value));
	}

	return (
		<Pagination
			sx={{
				display: 'flex',
				justifyContent: 'center',
				marginTop: '20px',
			}}
			color='primary'
			size={isSmallerThan900 ? 'small' : 'medium'}
			count={(totalPages > maxPages ? maxPages : totalPages) || maxPages}
			page={currentPage}
			onChange={handleChangePagination}
		/>
	);
}

export { MovieList };
