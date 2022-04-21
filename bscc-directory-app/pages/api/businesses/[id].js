import dbConnect from "../../../lib/dbConnect";
import Business from "../../../models/Business";

export default async function handler(req, res) {
	const {
		query: { id },
		method,
	} = req;

	await dbConnect();
	switch (method) {
		// Get a single business by its ID
		case "GET":
			try {
				const business = await Business.findById(id);
				if (!business) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: business });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		// Edit a business
		case "PUT":
			try {
				const business = await Business.findByIdAndUpdate(id, req.body, {
					new: true,
					runValidators: true,
				});
				if (!business) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: business });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;

		// Delete a business
		case "DELETE":
			try {
				const deletedBusiness = await Business.deleteOne({ _id: id });
				if (!deletedBusiness) {
					return res.status(400).json({ success: false });
				}
				res.status(200).json({ success: true, data: {} });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
}
