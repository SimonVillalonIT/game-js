import { SPRITE_URLS } from "./constants.ts"

export async function preloadImages(): Promise<void> {
    const urlsArrays = Object.values(SPRITE_URLS)
    urlsArrays.forEach(urls => {
        const loadImagePromises = urls.map(url => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = reject;
                img.src = url;
            });
        });
        Promise.all(loadImagePromises).then(() => {
            console.log("Images preloaded successfully");
        }).catch(error => {
            console.error("Failed to preload images:", error);
        });
    })
}

export function loadStateImages(url: string) {
    const img = new Image()
    img.src = url
    return img
}
