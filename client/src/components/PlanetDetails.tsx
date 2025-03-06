// client/src/components/PlanetDetails.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PlanetDetails() {
  const { planetId } = useParams<{ planetId: string }>();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    async function fetchPlanet() {
      try {
        const response = await fetch(
          `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_rade,pl_orbper,pl_orbsmax,hostname+from+pscomppars&format=json`,
        );
        const data = await response.json();

        // Encuentra el planeta con el ID correspondiente
        const selectedPlanet = data.find((p: any) => p.id === planetId);
        setPlanet(selectedPlanet);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPlanet();
  }, [planetId]);

  if (!planet) {
    return <div>Loading planet details...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{planet.name}</h1>
      <p>{planet.description}</p>
      {/* Muestra más detalles según lo que quieras */}
      <p>
        <strong>Orbital Period:</strong> {planet.orbitalPeriod}
      </p>
      <p>
        <strong>Radius:</strong> {planet.pl_rade}
      </p>
      <p>
        <strong>Orbital Semi-major Axis:</strong> {planet.pl_orbsmax}
      </p>
    </div>
  );
}
