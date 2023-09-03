import {
	CardMedia,
	Card,
	CardContent,
	Typography,
	IconButton,
	Paper,
	Box,
} from '@mui/material';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SERVER_API } from '../../../constants';
import { usePostFavoriteMoviesMutation } from '../../../services/api';
import { addAlert } from '../../../store/reducers/simple-alert-reducer';

function MovieCard({ movieData, added = false }) {
	const {
		id,
		backdrop_path: backdropPath,
		poster_path: posterPath,
		title,
		vote_average: voteAverage,
	} = movieData;

	return (
		<Card sx={{ width: '280px', height: '330px', margin: '5px' }}>
			<Link
				style={{
					textDecoration: 'none',
					color: 'black',
				}}
				to={`/movieDetails/${id}`}
			>
				<Paper
					elevation={3}
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
					}}
				>
					<CardMedia
						sx={{ height: '140px' }}
						image={`${SERVER_API.URL_IMG_MOVIES}${
							backdropPath || posterPath
						}`}
						alt={title}
					/>
					<CardContent
						sx={{
							flexGrow: 1,
							display: 'flex',
							flexDirection: 'column',
							justifyContent: 'space-between',
						}}
					>
						<div>
							<Typography
								gutterBottom
								variant='h5'
								component='div'
							>
								{title}
							</Typography>
						</div>
						<Box component='div'>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<Typography
									sx={{ fontWeight: 'bold', flexGrow: 1 }}
									variant='body2'
									color='text.secondary'
								>
									Рейтинг {voteAverage}
								</Typography>
								<MovieCardIconBtn id={id} added={added} />
							</div>
						</Box>
					</CardContent>
				</Paper>
			</Link>
		</Card>
	);
}

function MovieCardIconBtn({ id, added = false }) {
	const userData = useSelector((store) => store.user);
	const [postFavoriteMovies, { isError: isErrorPostFavoriteMovies }] =
		usePostFavoriteMoviesMutation({});
	const [favorite, setFavorite] = useState(added);
	const dispatch = useDispatch();

	useEffect(() => {
		if (isErrorPostFavoriteMovies) {
			const errorTitle = `Ошибка ${added ? 'удаления' : 'добавления'}`;
			const errorMessage = `Произошла ошибка при ${
				added ? 'удалении из избранного' : 'добавлении в избранное'
			}`;
			const errorMsg = {
				title: errorTitle,
				message: errorMessage,
				severity: 'error',
			};

			setFavorite(!favorite);
			dispatch(addAlert(errorMsg));
		}
	}, [isErrorPostFavoriteMovies]);

	function handleFavoriteClick(e) {
		e.preventDefault();

		const bodyForRequest = {
			media_type: 'movie',
			media_id: id,
			favorite: !favorite,
		};

		setFavorite(!favorite);

		const { accountId } = userData;

		postFavoriteMovies({ bodyForRequest, accountId });
	}

	return (
		<IconButton
			onClick={(e) => handleFavoriteClick(e)}
			sx={{ '&:hover': { cursor: 'pointer' } }}
		>
			{favorite ? <StarIcon /> : <StarOutlineOutlinedIcon />}
		</IconButton>
	);
}

export { MovieCard };
