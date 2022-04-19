import mongoose from "mongoose";

// BusinessSchema will correspond to a collection in your MongoDB Database
const BusinessSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please provide a business name"],
	},
	contact: {
		phone: {
			type: String,
			required: [true, "Please provide a phone number"],
		},
		website: {
			type: String,
		},
	},
	address: {
		line_1: {
			type: String,
			required: [true, "Please provide a valid address"],
		},
		line_2: {
			type: String,
		},
		town: {
			type: String,
			required: [true, "Please provide a valid address"],
		},
		postcode: {
			type: String,
			required: [true, "Please provide a valid address"],
		},
	},
	bio: {
		type: String,
		required: [true, "Please add details of your business"],
	},
});

export default mongoose.models.Business ||
	mongoose.model("Business", BusinessSchema);
