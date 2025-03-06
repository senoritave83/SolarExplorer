import { useEffect, useState } from "react";

export function usePlanets() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true); // Añadido el estado loading

  useEffect(() => {
    async function fetchPlanets() {
      try {
        const response = await fetch(
          "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_rade,pl_orbper,pl_orbsmax,hostname+from+pscomppars&format=json",
        );

        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API de la NASA");
        }

        const data = await response.json();
        setPlanets(data); // Guardamos los planetas obtenidos
        setLoading(false); // Establecemos el estado de carga a falso
      } catch (error) {
        console.error(error);
        setLoading(false); // Si hay error, también cambiamos el estado de carga
      }
    }

    fetchPlanets();
  }, []); // Ejecutar solo una vez cuando el componente se monta

  return { planets, loading }; // Retornamos tanto los planetas como el estado de carga
}
