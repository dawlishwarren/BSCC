import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
	region: "us-east-1",
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_KEY,
	signatureVersion: "v4",
});

export default async function handler(req, res) {
	const BUCKET_NAME = "bscc-directory-library";
	const BUCKET_URL = `https://${BUCKET_NAME}.s3.amazonaws.com/`;
	const { method } = req;

	switch (method) {
		case "GET":
			try {
				// Set request parameters
				const fileParams = {
					Bucket: BUCKET_NAME,
				};
				// AWS S3 'GET' all request, returns data
				s3.listObjectsV2(fileParams, function (err, data) {
					if (err) console.log(err);
					const contents = data.Contents;
					res.status(200).send({ contents });
				});
				const imageUrl = BUCKET_URL + `${folderId}/${uploadedImageKey}`;
				imageUrls.push(imageUrl);
			} catch (error) {
				// Error
				res.status(400).json({ success: false });
			}
	}
}
