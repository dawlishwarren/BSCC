import S3 from "aws-sdk/clients/s3";

const s3 = new S3({
	region: "us-east-1",
	accessKeyId: process.env.ACCESS_KEY,
	secretAccessKey: process.env.SECRET_KEY,
	signatureVersion: "v4",
});

export default async function handler(req, res) {
	// Set S3 bucket variables
	const BUCKET_NAME = "bscc-directory-library";
	const BUCKET_URL = `https://${BUCKET_NAME}.s3.amazonaws.com/`;
	// Destructuring request
	const {
		query: { id },
		method,
		files,
	} = req;

	switch (method) {
		case "GET":
			try {
				const imageUrls = [];
				const folderId = id;

				const fileParams = {
					Bucket: BUCKET_NAME,
					Prefix: `${folderId}`,
				};
				s3.listObjectsV2(fileParams, (err, data) => {
					if (err) console.log(err);
					else {
						const objects = JSON.parse(JSON.stringify(data.Contents));
						console.log(objects);
						debugger;
						for (const object of objects) {
							const { Key } = object;
							const imageUrl = BUCKET_URL + Key;
							imageUrls.push(imageUrl);
						}
					}
				});
				res.status(200).send({ success: true, data: imageUrls });
			} catch (error) {
				res.status(400).json({ success: false });
			}
		case "POST":
			try {
				// Create empty array for return
				const imageUrls = [];
				const folderId = id;
				// Loop through files from req body in case of multiple objects uploaded
				files.forEach((file) => {
					const [_, imageFormat] = file.type.split("/");
					console.log(imageFormat);
					// To do: replace uuid with SHA256
					const uploadedImageKey = `${uuid()}.${imageFormat}`;

					// Set request parameters
					const fileParams = {
						Bucket: BUCKET_NAME,
						Body: file,
						Key: `${folderId}/${uploadedImageKey}`,
					};

					// Send putObject which posts whole object to S3 bucket
					const res = s3.putObject(fileParams, function (err, data) {
						if (err) console.log(err, err.stack);
						else console.log(data);
					});
					console.log(res);
					const imageUrl = BUCKET_URL + `${folderId}/${uploadedImageKey}`;
					imageUrls.push(imageUrl);
				});
				// Return array of URLs to be added to
				return imageUrls;
			} catch (error) {
				res.status(400).json({ success: false });
			}
	}
}
