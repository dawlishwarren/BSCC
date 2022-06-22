import S3 from "aws-sdk/clients/s3";
import { v4 as uuid } from "uuid";

// Create Instance
const s3 = new S3({
	region: "us-east-1",
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_KEY,
	signatureVersion: "v4",
});

const BUCKET_NAME = "bscc-directory-library";
const BUCKET_URL = `https://${BUCKET_NAME}.s3.amazonaws.com/`;

export default async function handler(files, id) {
	try {
		const imageUrls = [];
		// Get MongoDB object id to be set as a directory in the S3 file params
		const folderId = id;
		// For each file uploaded
		files.forEach((file) => {
			// Get the format from the string
			const [_, imageFormat] = file.type.split("/");
			console.log(imageFormat);
			const uploadedImageKey = `${uuid()}.${imageFormat}`;

			// Set file params
			const fileParams = {
				Body: file,
				Bucket: BUCKET_NAME,
				Key: `${folderId}/${uploadedImageKey}`,
			};
			const response = s3.putObject(fileParams, function (err, data) {
				if (err) console.log(err, err.stack); // an error occurred
				else console.log(data); // successful response
			});
			console.log(response);
			const imageUrl = BUCKET_URL + `${folderId}/${uploadedImageKey}`;
			imageUrls.push(imageUrl);
		});
		return imageUrls;
	} catch (error) {
		console.log(error);
	}
}

// Export
export const config = {
	api: {
		bodyParser: {
			sizeLimit: "8mb",
		},
	},
};
