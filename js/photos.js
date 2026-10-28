// Real photos for thumbnails (assets/photos/, 640 × 480). Each .ph thumbnail has a colour
// value (--h); BY_HUE picks the photo that matches the file it stands for (Beach-sunset.heic
// shows the beach), and any other value falls back to the list in order.
export const PHOTOS = ['beach', 'mountains', 'city', 'skyline-night', 'concert', 'road-trip', 'moon', 'water', 'coffee', 'desk', 'forest', 'art', 'food']
  .map((n) => `assets/photos/${n}.jpg`);

export const BY_HUE = {
  200: 'beach', 330: 'concert', 220: 'city', 120: 'mountains', 10: 'road-trip', 30: 'coffee', 260: 'desk',
  280: 'skyline-night', 150: 'forest', 160: 'water', 210: 'water', 190: 'moon', 20: 'food', 40: 'food',
  250: 'art', 300: 'art', 90: 'forest', 60: 'road-trip', 230: 'city', 270: 'skyline-night',
};
