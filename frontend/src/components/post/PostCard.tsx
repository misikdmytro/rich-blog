import React from 'react';
import {
	Grid,
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from '@mui/material';
import moment from 'moment';
import { Post } from '../../types/post';

interface PostCardProps {
	post: Post;
}

const PostCard = (props: PostCardProps) => {
	const { post } = props;

	return (
		<Grid item container>
			<Grid item xs={0} sm={2} />
			<Grid item xs={12} sm={8}>
				<CardActionArea component="a" href={`/posts/${post.id}`}>
					<Card sx={{ display: 'flex' }}>
						<CardContent sx={{ flex: 1 }}>
							<Typography component="h2" variant="h4">
								{post.title}
							</Typography>
							<Typography variant="subtitle1" color="text.secondary">
								{moment(post.createdDate).format('MMMM Do YYYY')}
							</Typography>
							<Typography variant="subtitle1" paragraph sx={{ marginTop: '1em' }}>
								{post.description}
							</Typography>
							<Typography variant="subtitle1" color="primary">
								Continue reading...
							</Typography>
						</CardContent>
						<CardMedia
							component="img"
							sx={{ width: 260, display: { xs: 'none', sm: 'block' } }}
							image={post.image}
							alt={post.imageLabel}
						/>
					</Card>
				</CardActionArea>
			</Grid>
			<Grid item xs={0} sm={2} />
		</Grid>
	);
};

export default PostCard;
