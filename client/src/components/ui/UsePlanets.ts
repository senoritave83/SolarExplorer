import { useEffect, useState } from "react";

export function usePlanets() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await fetch(
          "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_rade,pl_orbper,pl_orbsmax,hostname+from+pscomppars&format=json"
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API de la NASA");
        }

        const data = await response.json();
        setPlanets(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlanets();
  }, []);

  return planets;
}
