import React from 'react';

const imageUrl = 'https://image.tmdb.org/t/p/w1280/';

const Movie = ({ title, average, posterPath, overview }) => {
	return (
		<div>
			<div className='movie'>
				<img src={posterPath ? `${imageUrl}${posterPath}`: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80'} alt={title} />
				<div className='movie-info'>
					<h3>{title}</h3>
					<span
						className={`tag ${
							average > 8
								? 'tag_green'
								: average >= 6
								? 'tag_orange'
								: 'tag_red'
						}`}
					>
						{average}
					</span>
				</div>
				<div className='overview'>
					<h2>Overview</h2>
					<p>{overview}</p>
				</div>
			</div>
		</div>
	);
};

export default Movie;
