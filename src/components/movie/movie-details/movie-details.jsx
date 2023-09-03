import {
	Box,
	Typography,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { SERVER_API } from '../../../constants';

function MovieDetails({ movieData }) {
	const { details, actors } = movieData;
	const navigate = useNavigate();

	function handleGoBackClick() {
		navigate('/');
	}

	return (
		<Box
			sx={{
				display: 'flex',
				paddingTop: '20px',
				width: '100%',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<Box>
					<Typography variant='h4'>{details.title}</Typography>
				</Box>
				<IconButton
					onClick={handleGoBackClick}
					sx={{ alignSelf: 'flex-start', paddingLeft: '0' }}
				>
					<ArrowBackIcon fontSize='large' />
				</IconButton>
				<Typography variant='h6'>{details.overview}</Typography>
				<MainInfo details={details} actors={actors} />
			</Box>
		</Box>
	);
}

export { MovieDetails };

function getMappedArray(array) {
	return array.map((item) => item.name).join(' / ');
}

function MainInfo({ details, actors }) {
	const { poster_path: posertPath, backdrop_path: backdropPath } = details;
	const { cast } = actors;

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'space-between',
				columnGap: '10px',
				rowGap: '30px',
				'@media (max-width: 600px)': {
					flexDirection: 'column-reverse',
					alignItems: 'center',
				},
			}}
		>
			<Box
				sx={{
					flexBasis: '60%',
					width: '100%',
				}}
			>
				<Typography variant='h5' sx={{ mb: '1rem', mt: '0.2rem' }}>
					Актеры
				</Typography>
				{cast.slice(0, 5).map((item) => (
					<Typography variant='h6' key={item.id}>
						{item.name}
					</Typography>
				))}
				<Typography variant='h5' sx={{ mb: '1.5rem' }}>
					Детали
				</Typography>
				<TableOfDetails details={details} />
			</Box>
			<div style={{ flexBasis: '40%', maxWidth: '400px' }}>
				<Box
					component='img'
					sx={{
						width: 'auto',
						height: 'auto',
						maxHeight: '100%',
						maxWidth: '100%',
						borderRadius: '6px',
					}}
					src={`${SERVER_API.URL_IMG_MOVIES}${
						posertPath || backdropPath
					}`}
				/>
			</div>
		</Box>
	);
}

function TableOfDetails({ details }) {
	const {
		budget,
		release_date: releaseDate,
		runtime,
		genres,
		production_countries: productionContries,
		vote_average: voteAverage,
		vote_count: voteCount,
		popularity,
	} = details;
	const scale = 1000000;
	const formattedBudget = `${(budget / scale).toFixed(1)} млн $`;
	const rows = [
		{
			label: 'Дата релиза',
			value: new Date(releaseDate).toLocaleDateString('ru-RU'),
		},
		{ label: 'Длительность', value: `${runtime} мин` },
		{ label: 'Жанры', value: getMappedArray(genres) },
		{ label: 'Бюджет', value: formattedBudget },
		{ label: 'Страны', value: getMappedArray(productionContries) },
		{ label: 'Популярность', value: popularity },
		{
			label: 'Результат голосований',
			value: voteAverage !== 0 ? voteAverage : null,
		},
		{
			label: 'Количество голосов',
			value: voteCount !== 0 ? voteCount : null,
		},
	];

	return (
		<Table>
			<TableBody>
				{rows.map((item) => (
					<TableRow key={item.label}>
						<TableCell component='th' scope='row'>
							{item.label}
						</TableCell>
						<TableCell>{item.value ?? 'Нет данных'}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
}
