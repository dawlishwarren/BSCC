import { useState } from 'react';
import aws from './api/s3/uploadFile';

const filedemo = () => {
	const [file, setFile] = useState();
	const [message, setMessage] = useState();

	function storeFile(e) {
		const selectedFile = e.target.files[0];
		console.log(selectedFile);
		setFile(selectedFile);
	}
	const uploadFile = async () => {
		setMessage('Uploading');
		var returnData = await aws(file);

		setMessage(returnData);
		setFile(null);
	};
	return (
		<div>
			<main>
				<p>Please select a file to upload</p>
				<input type='file' onChange={(e) => storeFile(e)} />
				{file && (
					<>
						<p>Selected file: {file.name}</p>
						<button onClick={uploadFile} defaultValue='Send'>
							Upload
						</button>
					</>
				)}
			</main>
		</div>
	);
};

export default filedemo;
