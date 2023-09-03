import { Autocomplete, Checkbox, TextField } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

function CheckBoxesGenres({ genresArray, onChange, value }) {
	const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
	const checkedIcon = <CheckBoxIcon fontSize='small' />;

	return (
		<Autocomplete
			sx={{ marginTop: '10px' }}
			value={value}
			// eslint-disable-next-line no-shadow
			isOptionEqualToValue={(option, value) => option.id === value?.id}
			limitTags={2}
			multiple
			size='small'
			id='checkboxes-movies'
			loading={!genresArray}
			options={genresArray || []}
			disableCloseOnSelect
			getOptionLabel={(option) => option.name}
			loadingText='Загрузка...'
			// eslint-disable-next-line no-shadow
			onChange={(e, value) => onChange(value)}
			renderOption={(props, option, { selected }) => (
				// eslint-disable-next-line react/jsx-props-no-spreading
				<li key={option.id} {...props}>
					<Checkbox
						icon={icon}
						checkedIcon={checkedIcon}
						style={{ marginRight: 8 }}
						checked={selected}
					/>
					{option.name}
				</li>
			)}
			style={{ width: '100%' }}
			renderInput={(params) => (
				<TextField
					// eslint-disable-next-line react/jsx-props-no-spreading
					{...params}
					variant='standard'
					label='Жанры'
					placeholder='Жанры'
				/>
			)}
		/>
	);
}

export { CheckBoxesGenres };
