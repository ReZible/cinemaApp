const SORT_OPTIONS = {
	POPULARITY_DESC: {
		id: 1,
		value: 'popularity.desc',
		text: 'Популярные по убыванию',
	},
	POPULARITY_ASC: {
		id: 2,
		value: 'popularity.asc',
		text: 'Популярные по возрастанию',
	},
	RAITING_DESC: {
		id: 3,
		value: 'vote_average.desc',
		text: 'Рейтинг по убыванию',
	},
	RAITING_ASC: {
		id: 4,
		value: 'vote_average.asc',
		text: 'Рейтинг по возрастанию',
	},
};

const yearNow = new Date().getFullYear();

const DEFAULT_YEARS_RANGE = [1950, yearNow];

const ACTION_TYPES = {
	SORT_BY_CHANGED: 'sort_by_changed',
	RANGE_OF_YEARS_CHANGED: 'range_of_years_changed',
	GENRES_CHANGED: 'genres_changed',
	SEARCH_BY_NAME_CHANGED: 'search_by_name_changed',
	FILTER_RESET: 'filter_reset',
};

export { SORT_OPTIONS, DEFAULT_YEARS_RANGE, ACTION_TYPES };
