export const base = `https://api.movies.tastejs.com`;
export const media_base = `https://image.tmdb.org/t/p`;

const cache = new Map();

export async function get(fetch: typeof globalThis.fetch, enpoint: string, params?: Record<string, string>) {
    const q = new URLSearchParams(params);
    const url = `${base}/${enpoint}?${q}`;

    if(cache.has(url)) {
        return cache.get(url);
    } else {
        const response = await fetch(url);
        const data = await response.json();
        cache.set(url, data);
        return data;
    }
}

export function media(file_path: string, width: number) {
    return `${media_base}/w${width}${file_path}`;
}