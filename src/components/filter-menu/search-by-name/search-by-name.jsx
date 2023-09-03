import { TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDebouncedFunction } from '../../../utils/use-debounced-function';

function SearchByName({ value, onChange }) {
	const [name, setName] = useState('');
	const debouncedNameChange = useDebouncedFunction(onChange, 500);

	useEffect(() => {
		setName(value);
	}, [value]);

	function handleChangeName(newName) {
		if (newName.trim() === '') return;

		setName(newName);
		debouncedNameChange(newName);
	}

	return (
		<TextField
			sx={{ mt: '10px', width: '100%' }}
			id='outlined-basic'
			label='Название'
			variant='outlined'
			onChange={(e) => handleChangeName(e.target.value)}
			value={name}
		/>
	);
}

export { SearchByName };
