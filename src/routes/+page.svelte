<script lang="ts">
	import Carousel from "$lib/components/Carousel.svelte";
	import { views } from "$lib/views";
    import Hero from "./Hero.svelte";

    export let data;
</script>

<h1 class="column">Top trending movies</h1>
<Hero movie={data.featured} />
<Carousel view={views.trending} href="/movies/trending" movies={data.trending.results} />
<Carousel view={views.now_playing} href="/movies/now_playing"movies={data.now_playing.results} />
<Carousel view={views.upcoming} href="/movies/upcoming" movies={data.upcoming.results} />