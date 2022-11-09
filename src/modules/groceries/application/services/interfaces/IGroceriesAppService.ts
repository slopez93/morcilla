import { Food } from "src/modules/groceries/domain/entities/Food";
import { CreateFoodDto } from "../../dtos/CreateFoodDto";

export interface IGroceriesAppService {
  getFoods(): Promise<Food[]>;
  createFood(foodDto: CreateFoodDto): Promise<void>;
}

export const GROCERIES_APP_SERVICE = Symbol("GroceriesListAppService");
