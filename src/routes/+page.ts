import * as api from '$lib/api';
import type { MovieDetails, MovieList } from '$lib/types';
import type { LoadEvent } from '@sveltejs/kit';

const base = `https://api.movies.tastejs.com`;
const page = '1';
const defaultQuery = { page };
export async function load({ fetch }: LoadEvent) {
    const [trending, now_playing, upcoming] = await Promise.all([
        api.get(fetch, `/trending/movie/day`, defaultQuery),
        api.get(fetch, `/movie/now_playing`, defaultQuery),
        api.get(fetch, `/movie/upcoming`, defaultQuery)
    ]) as Array<MovieList>;

    const featured = await api.get(fetch, `/movie/${trending.results[0].id}`, {
        append_to_response: 'images'
    })

    return {
        trending,
        featured,
        now_playing,
        upcoming
    }
}