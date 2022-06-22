import { set } from "mongoose";
import { useState } from "react";

const filedemo = () => {
	const [imageUrls, setImageUrls] = useState([]);

	const listBucketObjects = async () => {
		const objects = await fetch("/api/s3", {
			method: "GET",
		})
			.then((res) => res.body)
			.then((body) => {
				const reader = body.getReader();
				return new ReadableStream({
					start(controller) {
						function push() {
							reader.read().then(({ done, value }) => {
								if (done) {
									console.log("done", done);
									controller.close();
									return;
								}
								controller.enqueue(value);
								push();
							});
						}
						push();
					},
				});
			})
			.then((stream) => {
				return new Response(stream, {
					headers: { "Content-Type": "xml" },
				}).text();
			})
			.then((result) => {
				const images = JSON.parse(result).contents;
				images.map((image) => {
					const { Key } = image;
					setImageUrls((urls) => [...urls, Key]);
				});
			});
	};

	return (
		<div>
			<main>
				<button onClick={listBucketObjects}>Display all images</button>
				{imageUrls.map((url) => {
					imageUrls && imageUrls.length > 0 && (
						<>
							<p>hello world</p>
							<p>`https://bscc-directory-library.s3.amazonaws.com/${url}`</p>;
						</>
					);
				})}
			</main>
		</div>
	);
};

export default filedemo;
