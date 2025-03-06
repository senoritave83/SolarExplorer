import { type Planet, type InsertPlanet, type QuizAttempt, type InsertQuizAttempt } from "@shared/schema";
import { PLANET_DATA } from "@shared/constants";

export interface IStorage {
  getPlanets(): Promise<Planet[]>;
  getPlanet(id: number): Promise<Planet | undefined>;
  saveQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  getQuizAttempts(): Promise<QuizAttempt[]>;
}

export class MemStorage implements IStorage {
  private quizAttempts: Map<number, QuizAttempt>;
  private currentId: number;

  constructor() {
    this.quizAttempts = new Map();
    this.currentId = 1;
  }

  async getPlanets(): Promise<Planet[]> {
    return PLANET_DATA;
  }

  async getPlanet(id: number): Promise<Planet | undefined> {
    return PLANET_DATA.find(p => p.id === id);
  }

  async saveQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = this.currentId++;
    const quizAttempt: QuizAttempt = { ...attempt, id };
    this.quizAttempts.set(id, quizAttempt);
    return quizAttempt;
  }

  async getQuizAttempts(): Promise<QuizAttempt[]> {
    return Array.from(this.quizAttempts.values());
  }
}

export const storage = new MemStorage();
