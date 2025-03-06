import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Planet } from "@shared/schema";

interface PlanetCardProps {
  planet: Planet;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${planet.imageUrl})` }}
        />
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            {planet.name}
            <Badge variant="secondary">{planet.type}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {planet.description}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Diameter</p>
              <p className="font-medium">{planet.diameter.toLocaleString()} km</p>
            </div>
            <div>
              <p className="text-muted-foreground">Orbital Period</p>
              <p className="font-medium">{planet.orbitalPeriod} days</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
