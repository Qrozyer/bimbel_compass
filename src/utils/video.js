// src/utils/video.js

/**
 * Mengonversi URL video (khusus YouTube) menjadi URL embed.
 * Jika bukan link YouTube yang valid, akan mengembalikan null.
 *
 * @param {string} url - URL video
 * @returns {string|null} URL embed atau null jika tidak valid
 */
// utils/video.js
export const convertToEmbedUrl = (url) => {
    if (!url) return null;
  
    try {
      const parsedUrl = new URL(url);
      const isYoutube = parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be');
  
      if (!isYoutube) return null;
  
      const regExp = /^.*(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/))([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[3] ? `https://www.youtube.com/embed/${match[3]}` : null;
    } catch {
      return null;
    }
  };
  