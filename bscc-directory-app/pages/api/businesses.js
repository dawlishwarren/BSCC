import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
	const client = await clientPromise;
	const db = client.db('business_directory');
	switch (req.method) {
		case 'GET':
			const businesses = await db.collection('businesses').find({}).toArray();
			res.json({ status: 200, data: businesses });
	}
}
