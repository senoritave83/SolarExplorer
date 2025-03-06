import { motion } from "framer-motion";
import { PLANET_DATA } from "@shared/constants";
import { Link } from "wouter";
import { useState } from "react";

export default function SolarSystem() {
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);

  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg bg-[url('https://images.unsplash.com/photo-1464802686167-b939a6910659')] bg-cover bg-center">
      <div className="absolute inset-0 bg-black/50" />
      
      {PLANET_DATA.map((planet, index) => (
        <Link key={planet.id} href={`/planet/${planet.id}`}>
          <motion.div
            className="absolute cursor-pointer"
            style={{
              left: `${50 + (index * 10)}%`,
              top: "50%",
            }}
            whileHover={{ scale: 1.2 }}
            onHoverStart={() => setHoveredPlanet(planet.id)}
            onHoverEnd={() => setHoveredPlanet(null)}
          >
            <motion.div
              className="rounded-full bg-white/10 backdrop-blur"
              style={{
                width: `${planet.diameter / 1000}px`,
                height: `${planet.diameter / 1000}px`,
                backgroundImage: `url(${planet.imageUrl})`,
                backgroundSize: 'cover'
              }}
            />
            
            {hoveredPlanet === planet.id && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full mt-2 w-40 rounded bg-card p-2 text-center"
              >
                <p className="font-medium">{planet.name}</p>
                <p className="text-xs text-muted-foreground">{planet.type}</p>
              </motion.div>
            )}
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
