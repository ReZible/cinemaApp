// eslint-disable-next-line consistent-return
async function getResponseFromUrl(url, token) {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (response.ok) {
		const data = await response.json();

		return data;
	}
	throw new Response('', { status: response.status });
}
export { getResponseFromUrl };
