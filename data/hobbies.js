/*
 * HOBBIES DATA
 * ------------
 * Edit this file to add/remove hobby cards and collage photos in the
 * "Outside of work" section.
 *
 * HOBBIES — one card each. Fields:
 *   name    - short label (string)
 *   caption - one short line (string)
 *   image   - path to a SQUARE photo, relative to index.html. If the file doesn't
 *             exist yet, the card shows a "PHOTO PLACEHOLDER" box automatically —
 *             just drop a real photo at that path later, no code changes needed.
 *             Suggested convention: assets/hobbies/<name>.jpg
 *   alt     - optional short description of the photo, for screen readers
 *
 * COLLAGE — the photo wall above the cards. Fields:
 *   image   - path to the photo
 *   ratio   - width / height of the photo (e.g. 0.75 for a 3:4 portrait,
 *             1.3333 for a 4:3 landscape). The wall packs photos into even rows
 *             using this, so it should match the actual file.
 *   alt     - short description for screen readers
 *
 * Tip: photos from a phone carry GPS location in their metadata. The ones
 * already here were re-saved without it; do the same for any new ones
 * (e.g. export from Photos with "Location" unticked, or re-save as a fresh JPEG).
 */

const HOBBIES = [
  { name: "Skiing", caption: "gravity and i have beef", image: "assets/hobbies/skiing.jpg", alt: "On a chairlift with two friends" },
  // piano.jpg is a stand-in illustration of piano keys, not a photo — swap in a real one any time.
  { name: "Playing Piano", caption: "my longest situationship", image: "assets/hobbies/piano.jpg", alt: "An illustration of piano keys" },
  { name: "Playing Tennis", caption: "still haven't tried padel. it's on the list", image: "assets/hobbies/tennis.jpg", alt: "Two friends smiling through the strings of a tennis racket" },
  { name: "Doing Puzzles", caption: "supposed to be relaxing. until i can't find that ONE piece", image: "assets/hobbies/puzzles.jpg", alt: "A finished jigsaw puzzle of a lakeside terrace" },
  { name: "Building LEGO", caption: "the box says up to 99+. plenty of time left", image: "assets/hobbies/legos.jpg", alt: "A LEGO Baby Groot figure" },
  { name: "Getting Coffee", caption: "a quick coffee (4 hours later)", image: "assets/hobbies/coffee.jpg", alt: "An iced latte and a granola bowl at a café" },
  { name: "Going on Walks", caption: "didn't buy an apple watch for nothing", image: "assets/hobbies/walks.jpg", alt: "A narrow, sunlit old-town street" },
  { name: "Taking Photos", caption: "my camera roll needs help", image: "assets/hobbies/photography.jpg", alt: "Northern lights over snowy mountains" },
  { name: "Painting & Drawing", caption: "cheaper than therapy (excluding the sipping costs)", image: "assets/hobbies/painting.jpg", alt: "A colored-pencil floral drawing" },
  { name: "Hanging Out with Friends", caption: "the plot is always better with them", image: "assets/hobbies/friends.jpg", alt: "Friends crowded onto a tram, dressed in orange" },

  // Add more hobby entries below this line, following the same shape.
];

const COLLAGE = [
  // Order matters: photos are packed into rows left to right. This order was picked so the
  // rows fill evenly at desktop and tablet widths; re-check the wall if you add or reorder photos.
  { image: "assets/hobbies/collage-01.jpg", ratio: 1.3333, alt: "Friends on a boat with a Norwegian flag at sunset" },
  { image: "assets/hobbies/collage-13.jpg", ratio: 1.3333, alt: "Four friends at a theme-park entrance" },
  { image: "assets/hobbies/collage-08.jpg", ratio: 0.75, alt: "A very large brunch spread" },
  { image: "assets/hobbies/collage-07.jpg", ratio: 0.75, alt: "Painting at an outdoor table with grapefruit and drinks" },
  { image: "assets/hobbies/collage-05.jpg", ratio: 0.75, alt: "Red photo-booth strips from a night out with friends" },
  { image: "assets/hobbies/collage-17.jpg", ratio: 0.75, alt: "A hug on the street" },
  { image: "assets/hobbies/collage-09.jpg", ratio: 0.75, alt: "A game of Monopoly in progress" },
  { image: "assets/hobbies/collage-16.jpg", ratio: 1.3333, alt: "A selfie on a city street" },
  { image: "assets/hobbies/collage-10.jpg", ratio: 1.3333, alt: "A finished jigsaw puzzle of a mountain lake with a cabin" },
  { image: "assets/hobbies/collage-02.jpg", ratio: 0.75, alt: "A lit-up drawbridge over a canal at dusk" },
  { image: "assets/hobbies/collage-14.jpg", ratio: 0.75, alt: "Three friends at a café window table" },
  { image: "assets/hobbies/collage-06.jpg", ratio: 0.75, alt: "Colorful riverside houses and a footbridge" },
  { image: "assets/hobbies/collage-11.jpg", ratio: 0.75, alt: "Black-and-white photo-booth strips held up in front of a piano" },
  { image: "assets/hobbies/collage-15.jpg", ratio: 0.75, alt: "A potluck dinner table" },
  { image: "assets/hobbies/collage-03.jpg", ratio: 1.3333, alt: "A group photo in the snow under the northern lights" },
  { image: "assets/hobbies/collage-04.jpg", ratio: 0.75, alt: "A glow-in-the-dark painting of a cocktail glass" },
  { image: "assets/hobbies/collage-12.jpg", ratio: 0.75, alt: "Cocktails on a bar counter" },

  // Add more collage photos below this line, following the same shape.
];
