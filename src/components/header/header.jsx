import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Menu,
	MenuItem,
} from '@mui/material/';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../store/reducers/user-reducer';
import { setActiveModal, MODALS } from '../../store/reducers/modals-reducer';

function Header() {
	const [menuEl, setMenuEl] = useState(null);
	const dispatch = useDispatch();
	const userData = useSelector((store) => store.user);

	function handleMenuClose() {
		setMenuEl(null);
	}

	function handleMenuClick(e) {
		setMenuEl(e.currentTarget);
	}

	function handleLogOut() {
		dispatch(logOut());
		setMenuEl(null);
	}

	function handleSignIn() {
		dispatch(setActiveModal(MODALS.AUTHORIZATION));
		setMenuEl(null);
	}

	return (
		<AppBar position='static'>
			<Toolbar variant='def'>
				<Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
					<Link
						to='/'
						style={{
							textDecoration: 'none',
							color: 'white',
						}}
					>
						Фильмы
					</Link>
				</Typography>
				<div>
					<IconButton
						size='large'
						aria-label='account of current user'
						aria-controls='menu-appbar'
						aria-haspopup='true'
						color='inherit'
						onClick={handleMenuClick}
					>
						<AccountCircle />
					</IconButton>
					<Menu
						id='menu-appbar'
						anchorEl={menuEl}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						keepMounted
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						open={Boolean(menuEl)}
						onClose={handleMenuClose}
					>
						{userData.isLoggined ? (
							<MenuItem onClick={handleLogOut}>Выйти</MenuItem>
						) : (
							<MenuItem onClick={handleSignIn}>Войти</MenuItem>
						)}
					</Menu>
				</div>
			</Toolbar>
		</AppBar>
	);
}

export { Header };
