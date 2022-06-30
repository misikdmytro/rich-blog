import { ObjectId } from 'mongodb';
import { getObject } from '../../aws/s3';
import { getOrSetAsync } from '../../cache';

const {
	CONTENT_BUCKET = '',
} = process.env;

const body = async (
	{ id }: { id: ObjectId },
) => getOrSetAsync(`${id}.body`, async () => {
	const response = await getObject(CONTENT_BUCKET, id.toString());

	if (response.$response.error) {
		throw new Error('Cannot get body');
	}

	return response.Body?.toString('utf8');
}, 180 * 60);

export default body;
