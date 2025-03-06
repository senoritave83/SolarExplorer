import { usePlanets } from "./UsePlanets";

export default function PlanetList() {
  const { planets, loading } = usePlanets(); // Ahora recibimos loading

  if (loading) {
    return <div>Loading planets...</div>; // Muestra mensaje de carga
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {planets.map((planet) => (
        <div key={planet.id} className="p-4 border rounded-lg shadow-lg">
          <img
            src={planet.imageUrl}
            alt={planet.name}
            className="w-full h-40 object-cover"
          />
          <h2 className="text-lg font-bold mt-2">{planet.name}</h2>
          <p className="text-sm">{planet.description}</p>
        </div>
      ))}
    </div>
  );
}
