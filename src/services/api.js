import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { SERVER_API } from '../constants';

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: SERVER_API.BASE_URL,
		prepareHeaders: (headers, { getState }) => {
			const { token } = getState().user;

			if (token) {
				headers.set('accept', 'application/json');
				headers.set('authorization', `Bearer ${token}`);
			}

			return headers;
		},
	}),
	reducerPath: 'themoviedbApi',
	endpoints: (build) => ({
		getGenres: build.query({
			query: () => `${SERVER_API.GENRES_URL}`,
		}),
		getFavoriteMovies: build.query({
			query: (accountId) =>
				`account/${accountId}/favorite/movies?language=ru`,
		}),
		getListMovies: build.query({
			query: ({ filters, currentPage }) => {
				const sortingArgs = {
					searchByName: filters.searchByName,
					page: currentPage,
					sortBy: filters.sortBy,
					withGenres: filters.genres.map((i) => i.id).join(','),
					yearGte: `${filters.rangeOfYears[0]}-01-01`,
					yearLte: `${filters.rangeOfYears[1]}-01-01`,
				};
				const {
					searchByName,
					page,
					sortBy,
					withGenres,
					yearGte,
					yearLte,
				} = sortingArgs;
				const urlMovie =
					filters.searchByName !== ''
						? `${SERVER_API.URL_SEARCH_BY_NAME}?query=${searchByName}&language=ru&page=${currentPage}`
						: `${SERVER_API.URL_MOVIE_LIST}&page=${page}&release_date.gte=${yearGte}&release_date.lte=${yearLte}&sort_by=${sortBy}&with_genres=${withGenres}`;

				return urlMovie;
			},
		}),
		getDeatilsMovie: build.query({
			query: (movieId) => `movie/${movieId}?language=ru`,
		}),
		getActorsMovie: build.query({
			query: (movieId) => `movie/${movieId}/credits?language=ru`,
		}),
		postFavoriteMovies: build.mutation({
			query: ({ bodyForRequest, accountId }) => ({
				url: `account/${accountId}/favorite`,
				method: 'POST',
				body: bodyForRequest,
			}),
		}),
		getUserInfo: build.query({
			query: (headers) => ({
				url: `account/account_id`,
				headers,
			}),
		}),
	}),
});

export const {
	useGetGenresQuery,
	useGetFavoriteMoviesQuery,
	useGetListMoviesQuery,
	usePostFavoriteMoviesMutation,
	useGetActorsMovieQuery,
	useGetDeatilsMovieQuery,
	useGetUserInfoQuery,
	useLazyGetUserInfoQuery,
} = api;
