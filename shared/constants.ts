export const PLANET_DATA = [
  {
    id: 1,
    name: "Mercury",
    description: "The smallest and innermost planet in the Solar System.",
    diameter: 4879,
    distanceFromSun: 57.9,
    orbitalPeriod: 88,
    imageUrl: "https://images.unsplash.com/photo-1614314913007-2b4ae8ce32d6",
    funFacts: [
      "Mercury has no moons",
      "It has the most eccentric orbit of all planets",
      "Despite being closest to the Sun, Venus is actually hotter"
    ],
    type: "Terrestrial"
  },
  {
    id: 2,
    name: "Venus",
    description: "Often called Earth's sister planet due to similar size.",
    diameter: 12104,
    distanceFromSun: 108.2,
    orbitalPeriod: 225,
    imageUrl: "https://images.unsplash.com/photo-1614313913007-2b4ae8ce32d6",
    funFacts: [
      "Rotates backwards compared to other planets",
      "Has the hottest surface temperature",
      "Covered in thick clouds of sulfuric acid"
    ],
    type: "Terrestrial"
  },
  // Add more planets...
];

export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    id: 2,
    question: "What is the largest planet in our solar system?",
    options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
    correctAnswer: "Jupiter"
  },
  // Add more questions...
];
