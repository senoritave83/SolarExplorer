import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertQuizAttemptSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/api/planets", async (_req, res) => {
    const planets = await storage.getPlanets();
    res.json(planets);
  });

  app.get("/api/planets/:id", async (req, res) => {
    const planet = await storage.getPlanet(Number(req.params.id));
    if (!planet) {
      res.status(404).json({ message: "Planet not found" });
      return;
    }
    res.json(planet);
  });

  app.post("/api/quiz-attempts", async (req, res) => {
    try {
      const attempt = insertQuizAttemptSchema.parse(req.body);
      const savedAttempt = await storage.saveQuizAttempt(attempt);
      res.json(savedAttempt);
    } catch (error) {
      res.status(400).json({ message: "Invalid quiz attempt data" });
    }
  });

  app.get("/api/quiz-attempts", async (_req, res) => {
    const attempts = await storage.getQuizAttempts();
    res.json(attempts);
  });

  const httpServer = createServer(app);
  return httpServer;
}
