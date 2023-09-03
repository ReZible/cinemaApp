import { useState, useEffect } from 'react';
import { Typography, Slider } from '@mui/material';
import { DEFAULT_YEARS_RANGE } from '../constants/filter-constants';
import { useDebouncedFunction } from '../../../utils/use-debounced-function';

function SelectRangeOfYears({ value, onChange }) {
	const [years, setYears] = useState(DEFAULT_YEARS_RANGE);
	const minYear = DEFAULT_YEARS_RANGE[0];
	const maxYear = DEFAULT_YEARS_RANGE[1];
	const debouncedYearsChange = useDebouncedFunction(onChange, 500);
	const handleChangeYears = (event, newValue) => {
		setYears(newValue);
		debouncedYearsChange(event.target.value);
	};

	useEffect(() => {
		setYears(value);
	}, [value]);

	return (
		<>
			<Typography variant='body1' component='div' mt={3}>
				Год релиза:
			</Typography>
			<Slider
				name='sortYear'
				size='small'
				getAriaLabel={() => 'range of movie years'}
				value={years}
				onChange={handleChangeYears}
				valueLabelDisplay='auto'
				min={minYear}
				max={maxYear}
			/>
		</>
	);
}

export { SelectRangeOfYears };
