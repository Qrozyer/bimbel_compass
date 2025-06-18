// src/utils/video.js

/**
 * Menghapus tag HTML dari string (misalnya <p>...</p>).
 * @param {string} htmlString - Teks HTML yang ingin dibersihkan
 * @returns {string} Hasil string tanpa tag HTML
 */
export const stripHtml = (htmlString) => {
  const temp = document.createElement('div');
  temp.innerHTML = htmlString;
  return temp.textContent || temp.innerText || '';
};

/**
 * Mengonversi URL video (khusus YouTube) menjadi URL embed.
 * Jika bukan link YouTube yang valid, akan mengembalikan null.
 *
 * @param {string} url - URL video
 * @returns {string|null} URL embed atau null jika tidak valid
 */
export const convertToEmbedUrl = (url) => {
  if (!url) return null;

  try {
    const cleanUrl = stripHtml(url); // bersihkan HTML tag dulu
    const parsedUrl = new URL(cleanUrl);
    const isYoutube =
      parsedUrl.hostname.includes('youtube.com') ||
      parsedUrl.hostname.includes('youtu.be');

    if (!isYoutube) return null;

    const regExp = /^.*(youtu\.be\/|youtube\.com\/(watch\?v=|embed\/))([^#&?]*).*/;
    const match = cleanUrl.match(regExp);
    return match && match[3] ? `https://www.youtube.com/embed/${match[3]}` : null;
  } catch {
    return null;
  }
};
