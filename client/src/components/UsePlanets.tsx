import { useEffect, useState } from "react";

export function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await fetch("/api/planets");

        if (!response.ok) {
          throw new Error("Error al obtener los datos de los planetas");
        }

        const data = await response.json();
        setPlanets(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    fetchPlanets();
  }, []);

  return { planets, loading };
}