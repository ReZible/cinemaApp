import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@mui/material';
import { MovieDetails } from '../../components/movie/movie-details/movie-details';
import {
	useGetActorsMovieQuery,
	useGetDeatilsMovieQuery,
} from '../../services/api';

const initialMovieData = { details: null, actors: null };

function MovieDetailsPage() {
	const { movieId } = useParams();
	const [movieData, setMovieData] = useState(initialMovieData);
	const {
		data: actorsData,
		isError: isErrorActorsData,
		isLoading: isLoadingActorsData,
	} = useGetActorsMovieQuery(movieId);
	const {
		data: detailsData,
		isError: isErrorDetailsData,
		isLoading: isLoadingDetailsData,
	} = useGetDeatilsMovieQuery(movieId);
	const isAnyQueryLoading = isLoadingActorsData || isLoadingDetailsData;
	const hasError = isErrorActorsData || isErrorDetailsData;

	useEffect(() => {
		if (hasError || isAnyQueryLoading) return;

		setMovieData({ actors: actorsData, details: detailsData });
	}, [actorsData, detailsData]);

	return movieData.details && movieData.actors ? (
		<MovieDetails movieData={movieData} />
	) : (
		<CircularProgress />
	);
}

export { MovieDetailsPage };
