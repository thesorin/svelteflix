<script lang="ts">
	import { media } from '$lib/api';
	import type { Image, MovieDetails } from '$lib/types';

	export let movie: MovieDetails;
	let images: typeof movie.images;
	let backdrop: Image;

	$: images = movie.images;
	$: backdrop = images.backdrops.find((img) => !img.iso_639_1) || images.backdrops[0];
    $: logos = images.logos.find((img) => img.iso_639_1 === 'en') || images.logos[0];
</script>

<a href="/movie/{movie.id}" class="column">
	<img
		class="backdrop"
		src={media(backdrop.file_path, 1280)}
		alt={movie.title}
		style="aspect-ratio: {backdrop.aspect_ratio};"
	/>
	<img
		class="logo"
		src={media(logos.file_path, 1280)}
		alt={movie.title}
		style="aspect-ratio: {logos.aspect_ratio};"
	/>
</a>

<style>
    a {
        display: flex;
    }
	.backdrop {
		width: 100%;
	}
    .logo {
        position: absolute;
        top: 0;
        height: 100%;
        width: 30%;
        object-fit: contain;
        left: 1rem;
        filter: drop-shadow(0 0 1rem black);
    }
</style>
