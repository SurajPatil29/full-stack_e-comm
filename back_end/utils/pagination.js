// utils/pagination.js
export const paginate = async (
	model,
	query,
	page,
	perPage,
	populateField = null
) => {
	const totalItems = await model.countDocuments(query);
	const totalPages = Math.ceil(totalItems / perPage);

	const data = await model
		.find(query)
		.populate(populateField || "")
		.skip((page - 1) * perPage)
		.limit(perPage)
		.exec();

	return { data, totalPages };
};
