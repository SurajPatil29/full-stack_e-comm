export function extractPublicIdFromUrl(url) {
	const match = url.match(/upload\/(?:v\d+\/)?(.+)\.(jpg|jpeg|png|webp|gif)/);
	return match?.[1] || null;
}
