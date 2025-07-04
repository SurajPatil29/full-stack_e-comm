export const buildProductQuery = ({
	catId,
	subCatId,
	thirdsubCatId,
	rating,
}) => {
	const query = {};
	if (catId) query.catId = catId;
	if (subCatId) query.subCatId = subCatId;
	if (thirdsubCatId) query.thirdsubCatId = thirdsubCatId;
	if (rating !== undefined) query.rating = rating;
	return query;
};
