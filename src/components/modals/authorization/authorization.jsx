import { useEffect, useState } from 'react';
/* import { skipToken } from '@reduxjs/toolkit/query'; */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	TextField,
	Box,
	/* MenuItem, */
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { signIn } from '../../../store/reducers/user-reducer';
import { resetModal } from '../../../store/reducers/modals-reducer';
import { api } from '../../../services/api';
import { addAlert } from '../../../store/reducers/simple-alert-reducer';

const initialError = {
	status: false,
	message: '',
};
const initialUserInputData = {
	email: '',
	token: '',
};

function validationValue(value, activeModalText) {
	const inputValue = value.trim();

	if (inputValue === '') {
		throw new Error(`Поле '${activeModalText}' обязательно для заполнения`);
	}

	return inputValue;
}

function SignIn({ isOpen = true }) {
	const dispatch = useDispatch();
	const [isEmailModalOpen, setIsEmailModalOpen] = useState(true);
	const [error, setError] = useState(initialError);
	const [userInputData, setUserInputData] = useState(initialUserInputData);
	const [
		getUserInfoQuery,
		{
			data: userInfo,
			isError: isErorUserInfo,
			isLoading: isLoadintUserInfo,
		},
	] = api.useLazyGetUserInfoQuery();
	const activeModal = isEmailModalOpen ? 'email' : 'token';
	const activeModalText = isEmailModalOpen ? 'Почта' : 'Токен';

	useEffect(() => {
		if (userInfo && !isErorUserInfo && !isLoadintUserInfo) {
			const userData = {
				token: userInputData.token,
				accountId: userInfo.id,
			};
			dispatch(signIn(userData));
			dispatch(resetModal());
		}
	}, [userInfo]);

	useEffect(() => {
		if (isErorUserInfo) {
			const errorTitle = `Ошибка данных`;
			const errorMessage = `Произошла ошибка при получении данных с сервера`;
			const errorMsg = {
				title: errorTitle,
				message: errorMessage,
				severity: 'error',
			};

			dispatch(addAlert(errorMsg));
		}
	}, [isErorUserInfo]);

	function handleCloseClick() {
		setError(initialError);
		setUserInputData(initialUserInputData);
		setIsEmailModalOpen(true);
		dispatch(resetModal());
	}

	function handleChangeField(e) {
		try {
			const inputValue = validationValue(e.target.value, activeModalText);

			setError(initialError);
			setUserInputData((prevUserData) => ({
				...prevUserData,
				[e.target.name]: inputValue,
			}));
		} catch (err) {
			setError({
				status: true,
				message: err.message,
			});
		}
	}

	function handleContinueClick() {
		try {
			validationValue(userInputData.email, activeModalText);

			if (isEmailModalOpen && userInputData.email) {
				return setIsEmailModalOpen(!isEmailModalOpen);
			}

			validationValue(userInputData.token, activeModalText);

			if (userInputData.email && userInputData.token) {
				const headers = {
					accept: 'application/json',
					Authorization: `Bearer ${userInputData.token}`,
				};

				getUserInfoQuery(headers);
			}
		} catch (err) {
			setError({
				status: true,
				message: err.message,
			});
		}

		return null;
	}

	return (
		<div>
			<Dialog
				open={isOpen}
				onClose={handleCloseClick}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<Box>
					<DialogTitle id='alert-dialog-title'>
						Авторизация
					</DialogTitle>
					<DialogContent>
						<DialogContentText
							sx={{ height: '50px' }}
							id='alert-dialog-description'
						>
							{activeModalText}
						</DialogContentText>
						<TextField
							key={activeModal}
							name={activeModal}
							error={error.status}
							onChange={handleChangeField}
							sx={{ mt: '10px' }}
							label={activeModalText}
							variant='outlined'
							helperText={error.message}
						/>
					</DialogContent>
					<DialogActions
						sx={{ display: 'flex-start', padding: '8px 20px' }}
					>
						<Button onClick={handleCloseClick}>Отменить</Button>
						<Button
							onClick={handleContinueClick}
							autoFocus
							disabled={error.status}
						>
							Продолжить
						</Button>
					</DialogActions>
				</Box>
			</Dialog>
		</div>
	);
}

export { SignIn };
