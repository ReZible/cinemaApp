import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './reducers/user-reducer';
import { filtersReducer } from './reducers/filters-reducer';
import { simpleAlertReducer } from './reducers/simple-alert-reducer';
import { api } from '../services/api';
import { paginationReducer } from './reducers/pagination-reducers';
import { modalsReducer } from './reducers/modals-reducer';

const store = configureStore({
	reducer: {
		user: userReducer,
		filter: filtersReducer,
		pagination: paginationReducer,
		alert: simpleAlertReducer,
		modal: modalsReducer,
		[api.reducerPath]: api.reducer,
	},
	middleware: (gDM) => gDM().concat(api.middleware),
});

export { store };
