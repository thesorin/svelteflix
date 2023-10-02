import { views } from "$lib/views";

export function match(param: string) {
    return param in views;
}