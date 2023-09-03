const SERVER_API = {
	TOKEN: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YTYxYmFlYzNmZDFjNWE3MTFiMGViNjQ3ZTcxYThhYiIsInN1YiI6IjY0OTcxZTBjNmY0M2VjMDBhYzNhZGI3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rP3n6hYgEPkR78076l0IvETJJox2LxlXXkm8ElImJhI',
	URL_GENRES: 'https://api.themoviedb.org/3/genre/movie/list?language=ru',
	URL_POPULAR_MOVIES:
		'https://api.themoviedb.org/3/movie/popular?language=ru&page=',
	URL_TOP_RATED_MOVIES:
		'https://api.themoviedb.org/3/movie/top_rated?language=ru&page=',
	URL_IMG_MOVIES: 'https://image.tmdb.org/t/p/w500',
	URL_DETAILS_MOVIE: 'https://api.themoviedb.org/3/movie',
	URL_ACCOUNT_ID: 'https://api.themoviedb.org/3/account/account_id',
	URL_FAVORITE_MOVIES: 'https://api.themoviedb.org/3/account/',
	URL_SEARCH_BY_NAME: 'https://api.themoviedb.org/3/search/movie',
	BASE_URL: 'https://api.themoviedb.org/3/',
	GENRES_URL: 'genre/movie/list?language=ru',
	URL_MOVIE_LIST:
		'discover/movie?include_adult=false&include_video=false&language=ru',
};

export { SERVER_API };
