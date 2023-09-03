import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { RootBoundary } from '../../components/root-boundary/root-boundary';

function ErrorPage() {
	const navigate = useNavigate();

	function handleGoMainPageClick() {
		navigate('/');
	}
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				width: '100%',
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<h1>Упс!</h1>
			<p>Извините, произошла непредвиденная ошибка.</p>
			<div
				style={{
					color: 'gray',
				}}
			>
				<i>
					<RootBoundary />
				</i>
			</div>
			<Button
				variant='outlined'
				sx={{
					mt: '20px',
					color: 'black',
					borderColor: 'black',
					':hover': {
						borderColor: 'gray',
						backgroundColor: 'rgb(112, 97, 97, 0.04)',
					},
				}}
				onClick={() => handleGoMainPageClick()}
			>
				Вернуться на главное меню
			</Button>
		</div>
	);
}

export { ErrorPage };
