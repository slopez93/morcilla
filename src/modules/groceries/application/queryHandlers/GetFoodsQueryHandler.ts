import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { Food } from "../../domain/entities/Food";
import {
  FoodRepository,
  FOOD_REPOSITORY,
} from "../../domain/repositories/FoodsRepository";
import { FoodDto } from "../dtos/FoodDto";
import { GetFoodsQuery } from "../queries/GetFoodsQuery";

@QueryHandler(GetFoodsQuery)
export class GetFoodsQueryHandler implements IQueryHandler<GetFoodsQuery> {
  constructor(@Inject(FOOD_REPOSITORY) private repository: FoodRepository) {}

  public async execute(): Promise<FoodDto[]> {
    const foods = await this.repository.getAll();

    return foods.map((item) => ({
      id: item.id.toString(),
      name: item.name,
      image: item.image,
    }));
  }
}
