import { Alert, AlertTitle, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAlert } from '../../../store/reducers/simple-alert-reducer';

function SimpleAlert() {
	const alerts = useSelector((store) => store.alert.alerts);
	const dispatch = useDispatch();
	// eslint-disable-next-line consistent-return
	useEffect(() => {
		if (alerts.length > 10) {
			const timer = setTimeout(() => {
				dispatch(deleteAlert(alerts[0].id));
			}, 3000);

			return () => clearTimeout(timer);
		}
	}, [alerts]);

	function handleClose(alert) {
		dispatch(deleteAlert(alert.id));
	}

	return alerts.map((alert, index) => (
		<Alert
			key={alert.id}
			severity={alert.severity}
			sx={{
				maxWidth: '300px',
				position: 'fixed',
				top: `${10 + index * 120}px`,
				right: '10px',
				mb: '10px',
				zIndex: '1400',
			}}
			onClose={() => handleClose(alert)}
		>
			<AlertTitle>
				<strong>{alert.title}</strong>
			</AlertTitle>
			<Typography variant='body1'>{alert.message}</Typography>
		</Alert>
	));
}

export { SimpleAlert };
