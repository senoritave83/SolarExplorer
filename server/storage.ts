export class MemStorage implements IStorage {
  private quizAttempts: Map<number, QuizAttempt>;
  private currentId: number;

  constructor() {
    this.quizAttempts = new Map();
    this.currentId = 1;
  }

  async getPlanets(): Promise<Planet[]> {
    try {
      const response = await fetch(
        "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_rade,pl_orbper,pl_orbsmax,hostname+from+pscomppars&format=json"
      );
      const data = await response.json();

      // Convertir la estructura de la API en el formato de tu app
      return data.map((p: any, index: number) => ({
        id: index, // Usamos el índice como ID temporal
        name: p.pl_name,
        diameter: p.pl_rade ? p.pl_rade * 12742 : "Unknown", // Radio en radios terrestres convertido a km
        distanceFromSun: p.pl_orbsmax ? p.pl_orbsmax * 149597870 : "Unknown", // Convertimos de AU a km
        orbitalPeriod: p.pl_orbper || "Unknown",
        description: `An exoplanet orbiting the star ${p.hostname}.`,
        funFacts: [`Discovered orbiting ${p.hostname}.`],
        imageUrl: `https://exoplanetarchive.ipac.caltech.edu/images/exoimg/${p.pl_name}.jpg`, // Puede que no existan imágenes
      }));
    } catch (error) {
      console.error("Error fetching planets:", error);
      return [];
    }
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    const planets = await this.getPlanets();
    return planets.find(p => p.id === id);
  }

  async saveQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = this.currentId++;
    const quizAttempt: QuizAttempt = { ...attempt, id };
    this.quizAttempts.set(id, quizAttempt);
    return quizAttempt;
  }

  async getQuizAttempts(): Promise<QuizAttempt[]> {
    return Array.from(this.quizAttempts.values());
  }
}
