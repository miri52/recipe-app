// Inline SVG data URI — no external file needed
// Colors from the project theme (index.css)
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect fill="#f6f6f6" width="400" height="300"/>
      <text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle"
            font-family="sans-serif" font-size="48" fill="#909090">🍽</text>
      <text x="50%" y="60%" dominant-baseline="middle" text-anchor="middle"
            font-family="sans-serif" font-size="14" fill="#909090">No image</text>
    </svg>`
  );
