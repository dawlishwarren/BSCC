import React from "react";

const images = () => {
	const id = "6245e7a0f7e46753dcd0dae6";
	async function getImage() {
		const res = await fetch(`api/s3/${id}`, {
			method: "GET",
		});
	}
	return (
		<div>
			<button onClick={getImage}>Get Image</button>
		</div>
	);
};

export default images;
