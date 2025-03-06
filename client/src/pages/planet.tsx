import { useRoute } from "wouter";
import { PLANET_DATA } from "@shared/constants";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Planet() {
  const [, params] = useRoute("/planet/:id");
  const planet = PLANET_DATA.find(p => p.id === Number(params?.id));

  if (!planet) {
    return <div>Planet not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="relative h-96 rounded-lg overflow-hidden">
          <img
            src={planet.imageUrl}
            alt={planet.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
          <h1 className="absolute bottom-8 left-8 text-4xl font-bold">
            {planet.name}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Overview</h2>
              <p className="text-muted-foreground">
                {planet.description}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Physical Properties</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Diameter</p>
                  <p className="font-medium">{planet.diameter.toLocaleString()} km</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Distance from Sun</p>
                  <p className="font-medium">{planet.distanceFromSun} million km</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Orbital Period</p>
                  <p className="font-medium">{planet.orbitalPeriod} Earth days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Fun Facts</h2>
            <ul className="list-disc list-inside space-y-2">
              {planet.funFacts.map((fact, index) => (
                <li key={index} className="text-muted-foreground">
                  {fact}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
