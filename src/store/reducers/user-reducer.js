/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
	getUserDataCookie,
	setUserDataCookie,
} from '../../user-data/user-data-cookie';

const initialUser = {
	isLoggined: false,
	token: null,
	accountId: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState: getUserDataCookie() || initialUser,
	reducers: {
		signIn(state, action) {
			const updatedUser = {
				isLoggined: true,
				token: action.payload.token,
				accountId: action.payload.accountId,
			};

			setUserDataCookie(updatedUser);

			state.isLoggined = true;
			state.token = action.payload.token;
			state.accountId = action.payload.accountId;
		},
		logOut() {
			setUserDataCookie(initialUser);
			// eslint-disable-next-line no-restricted-globals
			location.reload();
			return initialUser;
		},
	},
});

const { actions, reducer } = userSlice;

export const { signIn, logOut } = actions;

export { reducer as userReducer };
