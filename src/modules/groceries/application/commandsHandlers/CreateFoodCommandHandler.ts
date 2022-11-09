import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { Food } from "../../domain/entities/Food";
import {
  FoodRepository,
  FOOD_REPOSITORY,
} from "../../domain/repositories/FoodsRepository";
import { CreateFoodCommand } from "../commands/CreateFoodCommand";

@CommandHandler(CreateFoodCommand)
export class CreateFoodCommandHandler
  implements ICommandHandler<CreateFoodCommand>
{
  constructor(@Inject(FOOD_REPOSITORY) private repository: FoodRepository) {}

  public async execute({
    food: { name, image },
  }: CreateFoodCommand): Promise<void> {
    const foods = await this.repository.getAll();

    const existFood = foods.find(
      (f) => f.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );

    if (existFood) {
      throw new Error("This food already exist");
    }

    const food = Food.create({ name, image });

    await this.repository.save(food);
  }
}
