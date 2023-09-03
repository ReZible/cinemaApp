import Container from '@mui/material/Container';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/header/header';

function MainPage() {
	return (
		<>
			<Header />
			<Container maxWidth='xl'>
				<Outlet />
			</Container>
		</>
	);
}

export { MainPage };
