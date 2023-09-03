import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MainPage } from './pages/main-page/main-page';
import { ErrorPage } from './pages/error-page/error-page';
import { MovieDetailsPage } from './pages/movie-details-page/movie-details-page';
import { FilterPage } from './pages/filter-page/filter-page';
import { store } from './store/store';
import { SimpleAlert } from './components/alerts/simple-alert/simple-alert';
import { api } from './services/api';
import { ModalsController } from './components/modals/modals-controller/modals-controller';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainPage />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: '/',
				element: <FilterPage />,
				errorElement: <ErrorPage />,
			},
			{
				path: 'movieDetails/:movieId',
				element: <MovieDetailsPage />,
				errorElement: <ErrorPage />,
				loader: async ({ params }) => {
					const actorsData = store.dispatch(
						api.endpoints.getActorsMovie.initiate(params.movieId),
					);
					const detailsData = store.dispatch(
						api.endpoints.getDeatilsMovie.initiate(params.movieId),
					);
					const { data: actors, error: actorsError } =
						await actorsData;
					const { data: details, error: detailsError } =
						await detailsData;

					actorsData.unsubscribe();
					detailsData.unsubscribe();

					if (actorsError || detailsError) {
						if (
							(actorsError.status || detailsError.status) ===
							'FETCH_ERROR'
						)
							throw new Response('', {
								status: 503,
							});
						throw new Response('', {
							status: actorsError.status || detailsError.status,
						});
					}

					return { details, actors };
				},
			},
		],
	},
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<SimpleAlert />
			<ModalsController />
		</Provider>
	</React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
