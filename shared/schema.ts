import { useEffect, useState } from "react";
import { z } from "zod";

export interface Planet {
  id: number;
  name: string;
  description: string;
  diameter: number | string;
  distanceFromSun: number | string;
  orbitalPeriod: number | string;
  imageUrl: string;
  funFacts: string[];
  type: string;
}

export function usePlanets() {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await fetch(
          "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_rade,pl_orbper,pl_orbsmax,hostname+from+pscomppars&format=json"
        );
        const data = await response.json();

        // Convertir los datos de la API al formato de PLANET_DATA
        const transformedPlanets = data.map((p: any, index: number) => ({
          id: index, // Se usa el índice como ID temporal
          name: p.pl_name,
          description: `An exoplanet orbiting the star ${p.hostname}.`,
          diameter: p.pl_rade ? (p.pl_rade * 12742).toFixed(2) : "Unknown", // Radio terrestre convertido a km
          distanceFromSun: p.pl_orbsmax ? (p.pl_orbsmax * 149597870).toFixed(2) : "Unknown", // AU a km
          orbitalPeriod: p.pl_orbper ? p.pl_orbper.toFixed(2) : "Unknown",
          imageUrl: `https://source.unsplash.com/400x400/?planet,space`, // Imagen aleatoria de planetas
          funFacts: [`Discovered orbiting ${p.hostname}.`],
          type: "Exoplanet"
        }));

        setPlanets(transformedPlanets);
      } catch (error) {
        console.error("Error fetching planets:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanets();
  }, []);

  return { planets, loading };
}

export interface QuizAttempt {
  id: number;
  username: string;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export type InsertQuizAttempt = Omit<QuizAttempt, "id">;

export const insertQuizAttemptSchema = z.object({
  username: z.string().min(1),
  score: z.number().int().min(0),
  totalQuestions: z.number().int().min(1),
  completedAt: z.string().datetime()
});

