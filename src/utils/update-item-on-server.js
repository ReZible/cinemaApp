async function updateItemOnServer(url, token, body) {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(body),
	});

	if (response.ok) {
		const data = await response.json();

		return data;
	}
	throw new Response('', { status: response.status });
	/* throw new Error(`error HTTP: ${response.status}`); */
}
export { updateItemOnServer };
