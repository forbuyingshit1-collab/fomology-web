/**
 * Cloudinary video transformation helpers for FOMOLOGY
 */

const VIDEO_UPLOAD_MARKER = "/video/upload/";

export function getCloudinaryVideoPreviewUrl(originalUrl: string): string {
  if (!originalUrl.includes(VIDEO_UPLOAD_MARKER)) {
    throw new Error(
      `Invalid Cloudinary video URL: "${originalUrl}". Expected to contain "${VIDEO_UPLOAD_MARKER}".`
    );
  }

  // Insert preview transformation: 8-second preview starting at 0s, eco quality, auto codec
  return originalUrl.replace(
    VIDEO_UPLOAD_MARKER,
    `${VIDEO_UPLOAD_MARKER}so_0,du_8,q_auto:eco,vc_auto/`
  );
}

export function getCloudinaryVideoPosterUrl(originalUrl: string): string {
  if (!originalUrl.includes(VIDEO_UPLOAD_MARKER)) {
    throw new Error(
      `Invalid Cloudinary video URL: "${originalUrl}". Expected to contain "${VIDEO_UPLOAD_MARKER}".`
    );
  }

  // Insert poster transformation: automatic frame selection, auto quality, jpg format
  const transformedUrl = originalUrl.replace(
    VIDEO_UPLOAD_MARKER,
    `${VIDEO_UPLOAD_MARKER}so_auto,q_auto,f_jpg/`
  );

  // Replace video extension with .jpg
  return transformedUrl.replace(/\.[a-zA-Z0-9]+$/, ".jpg");
}
