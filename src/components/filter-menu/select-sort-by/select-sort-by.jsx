import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { SORT_OPTIONS } from '../constants/filter-constants';

function SelectSortBy({ value, onChange }) {
	return (
		<FormControl variant='standard' fullWidth sx={{ marginTop: '10px' }}>
			<InputLabel variant='standard'>Сортировать по</InputLabel>
			<Select
				value={value}
				name='sortOptions'
				onChange={(e) => onChange(e.target.value)}
			>
				{Object.values(SORT_OPTIONS).map((option) => (
					<MenuItem key={option.id} value={option.value}>
						{option.text}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
}

export { SelectSortBy };
