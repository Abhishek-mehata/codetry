import type { Review } from "../types/stays";

export let REVIEWS: Review[] = [
  {
    thumbnail: "/images/global/reviews/kevin.png",
    name: "Kevin",
    date: new Date(),
    content:
      "Highlight of my trip. I learned so much about the real local culture and its development, Mohamed is a guide of great knowledge and passion. He was open, straightforward...",
    rating: 4.5,
  },
  {
    thumbnail: "/images/global/reviews/zahra.png",
    name: "Zaraha",
    date: new Date(),
    content:
      "Highlight of my trip. I learned so much about the real local culture and its development, Mohamed is a guide of great knowledge and passion. He was open, straightforward...",
    rating: 4.5,
  },
  {
    thumbnail: "/images/global/reviews/yasmin.png",
    name: "Yasmin",
    date: new Date(),
    content:
      "Highlight of my trip. I learned so much about the real local culture and its development, Mohamed is a guide of great knowledge and passion. He was open, straightforward...",
    rating: 4.5,
  },
  {
    thumbnail: "/images/global/reviews/luca.png",
    name: "Luca",
    date: new Date(),
    content:
      "Highlight of my trip. I learned so much about the real local culture and its development, Mohamed is a guide of great knowledge and passion. He was open, straightforward...",
    rating: 4.5,
  },
  {
    thumbnail: "/images/global/reviews/vita.png",
    name: "Vita",
    date: new Date(),
    content:
      "Highlight of my trip. I learned so much about the real local culture and its development, Mohamed is a guide of great knowledge and passion. He was open, straightforward...",
    rating: 4.5,
  },
];

Array.from({ length: 20 }).forEach(() => {
  REVIEWS = [
    ...REVIEWS,
    {
      thumbnail: "/images/global/reviews/vita.png",
      name: "Vita",
      date: new Date(),
      content:
        "Highlight of my trip. I learned so much about the real local culture and its development, Mohamed is a guide of great knowledge and passion. He was open, straightforward...",
      rating: 4.5,
    },
  ];
});
