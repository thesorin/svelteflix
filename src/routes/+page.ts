import * as api from '$lib/api';
import type { MovieDetails, MovieList } from '$lib/types';
import type { LoadEvent } from '@sveltejs/kit';

const base = `https://api.movies.tastejs.com`;

export async function load({ fetch }: LoadEvent) {
    const [trending, now_playing, upcoming] = await Promise.all([
        api.get(fetch, `/trending/movie/day`),
        api.get(fetch, `/movie/now_playing`),
        api.get(fetch, `/movie/upcoming`)
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