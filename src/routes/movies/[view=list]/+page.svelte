<script lang="ts">
    import * as api from '$lib/api';
	import ResultsPage from "$lib/components/ResultsPage.svelte";
	import type { MovieList } from "$lib/types.js";

    export let data;

    let appending = false;

    const onEnd = async () => {
        if(!data.next_page || appending) return;
        appending = true;
       
        const next = await api.get(fetch, data.endpoint, {
            page: String(data.next_page)
        }) as MovieList;

        
        data.movies = [...data.movies, ...next.results];
        data.next_page = next.page < next.total_pages ? next.page + 1 : null;
        appending = false;
    }
</script>

<div class="column">
    <h1>{data.title}</h1>
    <ResultsPage movies={data.movies} next={data.next_page ? `/movies/{data.view}?page={data.next_page}` : null }
    on:end={onEnd} />
</div>

<style>
    .column {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
</style>