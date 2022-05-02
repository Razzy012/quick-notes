import { writable, get } from 'svelte/store'

export interface popupItem {
    component: any;
    props?: {
        [key: string]: any;
    };
}

export const popup = writable<popupItem|null>(null);
export const beforeRemove = writable<() => void>(() => {});

export function setPopup(component: any, props: {[key: string]: any}={}) {
    if (props)
        popup.set({component, props});
    else
        popup.set({component});
}

export async function removePopup() {
    await get(beforeRemove)();
    popup.set(null);
    beforeRemove.set(() => {});
}