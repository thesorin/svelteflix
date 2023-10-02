import * as api from '$lib/api';
import type { MovieDetails } from '$lib/types';
import type { LoadEvent } from '@sveltejs/kit';

export async function load({ params, fetch }: LoadEvent) {
	const movie = (await api.get(fetch, `/movie/${params.id}`, {
		append_to_response: 'images,videos,recomandations'
	})) as MovieDetails;

	const trailer = movie.videos.results.find(
		(vid) =>
			vid.official && 
            vid.site === 'YouTube' && 
            (vid.type === 'Trailer' || vid.type === 'Teaser')
	);

	return {
		movie,
        trailer
	};
}
