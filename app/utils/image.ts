export function getOptimizedImageUrl(url: string, width?: number): string {
  if (!url) return url;
  if (url.includes("cloudinary.com")) {
    // If it already has f_auto or q_auto, don't double inject
    if (url.includes("/f_auto") || url.includes("/q_auto")) {
      return url;
    }
    const uploadStr = "/upload";
    const uploadIndex = url.indexOf(uploadStr);
    if (uploadIndex !== -1) {
      const insertionPoint = uploadIndex + uploadStr.length;
      const transformation = width ? `/f_auto,q_auto,w_${width}` : "/f_auto,q_auto";
      return url.slice(0, insertionPoint) + transformation + url.slice(insertionPoint);
    }
  }
  return url;
}
