import Grid from '@mui/material/Unstable_Grid2';
import { useSelector } from 'react-redux';
import { FilterMenu } from '../../components/filter-menu/filter-menu';
import { MovieList } from '../../components/movie/movie-list/movie-list';
import { AuthorizationPage } from '../authorization-page/authorization-page';

function FilterPage() {
	const userData = useSelector((store) => store.user);

	return userData.isLoggined ? (
		<Grid container spacing={2}>
			<Grid xs={12} sm={12} md={4} lg={3}>
				<FilterMenu />
			</Grid>
			<Grid xs={12} sm={12} md={8} lg={9}>
				<MovieList />
			</Grid>
		</Grid>
	) : (
		<AuthorizationPage />
	);
}

export { FilterPage };
