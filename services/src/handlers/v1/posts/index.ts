import { Express } from 'express';
import { body, param, query } from 'express-validator';
import create from './create';
import getById from './getById';
import get from './get';

const postsV1 = (app: Express) => {
	app.get(
		'/v1/posts',
		query('pageNum').isInt({ min: 0 }).optional(),
		query('pageSize').isInt({ min: 1, max: 500 }).optional(),
		get,
	);
	app.get('/v1/posts/:id', param('id').notEmpty(), getById);

	app.put(
		'/v1/posts',
		body('name').isLength({ max: 500 }).trim().escape()
			.notEmpty(),
		body('body').notEmpty(),
		create,
	);
};

export default postsV1;
