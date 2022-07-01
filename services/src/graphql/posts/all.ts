import { ObjectId } from 'mongodb';
import { query } from '../../db';
import { PostDocument } from '../../types/post';

const {
	POSTS_COLLECTION = 'posts',
} = process.env;

interface FilterPostsInput {
	id?: string
}

interface PaginationInput {
	skip: number,
	take: number
}

interface PostsArgs {
	filter?: FilterPostsInput,
	pagination?: PaginationInput
}

const all = async (
	_parent: unknown,
	{ filter: filterArgs, pagination }: PostsArgs,
) => {
	const filter: Record<string, unknown> = {};

	if (filterArgs?.id) {
		filter._id = new ObjectId(filterArgs.id);
	}

	const cursor = await query<PostDocument>(
		POSTS_COLLECTION,
		filter,
	);

	const { skip, take } = pagination || { skip: 0, take: 10 };

	const fetchCursor = cursor.sort({ createdDate: -1 })
		.skip(skip)
		.limit(take)
		.map((doc) => ({
			id: doc._id,
			...doc,
		}));

	const posts = await fetchCursor.toArray();

	return {
		posts,
		hasNext: posts.length === take,
	};
};

export default all;