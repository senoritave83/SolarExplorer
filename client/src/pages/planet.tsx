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
        const response = await fetch(`/api/planets/${params?.id}`);
        
        if (!response.ok) {
          throw new Error("Planet not found");
        }
        
        const planetData = await response.json();
        setPlanet(planetData);
      } catch (error) {
        console.error("Error fetching planet data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (params?.id) {
      fetchPlanetData();
    }
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
            {planet.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">
                {planet.description || `${planet.name} is an exoplanet with unique characteristics.`}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Physical Properties</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Diameter</p>
                  <p className="font-medium">{planet.diameter || 'Unknown'}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Orbital Period</p>
                  <p className="font-medium">{planet.orbitalPeriod || 'Unknown'}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Distance from Sun</p>
                  <p className="font-medium">{planet.distanceFromSun || 'Unknown'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}