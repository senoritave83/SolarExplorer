import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useEffect, useState } from "react";

export default function Planet() {
  const [, params] = useRoute("/planet/:id");
  const [planet, setPlanet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlanetData() {
      try {
        const response = await fetch(
          "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_rade,pl_orbper,pl_orbsmax,hostname+from+pscomppars&format=json"
        );
        const data = await response.json();

        // Buscar el planeta por índice (o usar otro criterio)
        const planetData = data[params?.id]; // Suponiendo que `id` es un índice
        setPlanet(planetData);
      } catch (error) {
        console.error("Error fetching planet data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPlanetData();
  }, [params?.id]);

  if (loading) return <div>Loading...</div>;
  if (!planet) return <div>Planet not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="relative h-96 rounded-lg overflow-hidden">
          <h1 className="absolute bottom-8 left-8 text-4xl font-bold">
            {planet.pl_name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">
                {planet.pl_name} orbits the star {planet.hostname}.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Physical Properties</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Radius</p>
                  <p className="font-medium">{planet.pl_rade} Earth radii</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Orbital Period</p>
                  <p className="font-medium">{planet.pl_orbper} days</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Distance from Star</p>
                  <p className="font-medium">{planet.pl_orbsmax} AU</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
