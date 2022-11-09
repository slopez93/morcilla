import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Food } from "../../domain/entities/Food";
import { FoodNotFound } from "../../domain/exceptions/FoodNotFound";
import {
  FoodRepository,
  FOOD_REPOSITORY,
} from "../../domain/repositories/FoodsRepository";
import { GetFoodQuery } from "../queries/GetFoodQuery";

@QueryHandler(GetFoodQuery)
export class GetFoodQueryHandler implements IQueryHandler<GetFoodQuery> {
  constructor(@Inject(FOOD_REPOSITORY) private repository: FoodRepository) {}

  execute({ foodId }: GetFoodQuery): Promise<Food> {
    const food = this.repository.getById(foodId);

    if (!food) {
      throw new FoodNotFound(foodId);
    }

    return food;
  }
}
