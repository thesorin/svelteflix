import * as api from '$lib/api';
import type { MovieDetails, MovieList } from '$lib/types';
import type { LoadEvent } from '@sveltejs/kit';

const base = `https://api.movies.tastejs.com`;

export async function load({ fetch }: LoadEvent) {
    const trending = await api.get(fetch, `/trending/movie/day`) as MovieList;
    const featured = await api.get(fetch, `/movie/${trending.results[0].id}`, {
        append_to_response: 'images'
    })

    return {
        trending,
        featured
    }
}