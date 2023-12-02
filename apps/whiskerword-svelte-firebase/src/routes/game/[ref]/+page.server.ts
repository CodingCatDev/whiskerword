export const load = async ({ params }) => {
	const { ref } = params;

	const words = Array.from('xenastevethomasvictory').sort(() => Math.random() - 0.5);
	return {
		letters: words
	};
};
