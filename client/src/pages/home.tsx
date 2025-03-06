import SolarSystem from "@/components/solar-system";
import PlanetCard from "@/components/planet-card";
import { PLANET_DATA } from "@shared/constants";

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Explore Our Solar System
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Journey through space and discover the wonders of our cosmic neighborhood.
          Learn about the planets, their characteristics, and fascinating facts.
        </p>
      </section>

      <SolarSystem />

      <section>
        <h2 className="text-2xl font-semibold mb-6">Planet Directory</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PLANET_DATA.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))}
        </div>
      </section>
    </div>
  );
}
