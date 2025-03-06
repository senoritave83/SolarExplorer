import { pgTable, text, serial, integer, real } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const planets = pgTable("planets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  diameter: real("diameter").notNull(),
  distanceFromSun: real("distance_from_sun").notNull(),
  orbitalPeriod: real("orbital_period").notNull(),
  imageUrl: text("image_url").notNull(),
  funFacts: text("fun_facts").array().notNull(),
  type: text("type").notNull(),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertPlanetSchema = createInsertSchema(planets);
export const insertQuizAttemptSchema = createInsertSchema(quizAttempts);

export type Planet = typeof planets.$inferSelect;
export type InsertPlanet = z.infer<typeof insertPlanetSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
