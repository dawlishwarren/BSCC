import dbConnect from "../../../lib/dbConnect";
import Business from "../../../models/Business";

export default async function handler(req, res) {
	const { method } = req;

	await dbConnect();
	switch (method) {
		case "GET":
			try {
				const businesses = await Business.find({});
				res.status(200).json({ success: true, data: businesses });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		case "POST":
			try {
				const business = await Business.create(req.body);
				res.status(201).json({ success: true, data: business });
			} catch (error) {
				res.status(400).json({ success: false });
			}
			break;
		default:
			res.status(400).json({ success: false });
	}
}
