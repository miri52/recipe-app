// Inline SVG data URI — no external file needed
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#e5e7eb" width="400" height="300"/>
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle"
            font-family="sans-serif" font-size="48" fill="#9ca3af">🍽</text>
      <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle"
            font-family="sans-serif" font-size="14" fill="#9ca3af">No image</text>
    </svg>`
  );
