export async function preloadImages(obj: { [key: string]: string[] }): Promise<void> {
    const urlsArrays = Object.values(obj)
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
