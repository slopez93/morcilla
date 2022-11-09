import { Food } from "../entities/Food";

export interface FoodRepository {
  getAll(): Promise<Food[]>;
  getById(foodId: string): Promise<Food>;
  save(food: Food): Promise<void>;
}

export const FOOD_REPOSITORY = Symbol("FOOD_REPOSITORY");
