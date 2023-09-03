import { Alert, AlertTitle, Box } from '@mui/material';

function AuthorizationPage() {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: '50%',
				left: '50%',
				transform: 'translate(-50%, -50%)',
			}}
		>
			<Alert severity='warning'>
				<AlertTitle>Предупреждение</AlertTitle>
				<strong>Для просмотра сайта необходима авторизация</strong>
			</Alert>
		</Box>
	);
}

export { AuthorizationPage };
