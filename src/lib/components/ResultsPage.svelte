<script lang="ts">
	import { media } from "$lib/api";
	import type { MovieListResult } from "$lib/types";

    export let movies: MovieListResult[];
    export let next: string | null;
</script>

<div class="results">
    {#each movies as movie}
        <a href="/movies/{movie.id}">
            <img src={media(movie.poster_path, 500)} alt={movie.title}>
        </a>
    {/each}
</div>

<style>
    .results {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        width: 100%;
    }

    a {
        width: 100%;
        height: auto;
        padding: 0.5rem;
        aspect-ratio: 2/3;
    }

    img {
        width: 100%;
    }
</style>