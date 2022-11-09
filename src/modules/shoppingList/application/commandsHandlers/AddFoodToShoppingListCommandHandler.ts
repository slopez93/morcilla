import { CommandHandler, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { GetFoodQuery } from "src/modules/groceries/application/queries/GetFoodQuery";
import { AddFoodToShoppingListService } from "../../domain/services/AddFoodToShoppingListService";
import { AddFoodToShoppingListCommand } from "../commands/AddFoodToShoppingListCommand";

@CommandHandler(AddFoodToShoppingListCommand)
export class AddFoodToShoppingListCommandHandler
  implements ICommandHandler<AddFoodToShoppingListCommand>
{
  constructor(
    private queryBus: QueryBus,
    private addFoodService: AddFoodToShoppingListService
  ) {}

  async execute({
    foodId,
    nextShoppingList,
  }: AddFoodToShoppingListCommand): Promise<any> {
    const food = await this.queryBus.execute(new GetFoodQuery(foodId));

    await this.addFoodService.addFood(food, nextShoppingList);
  }
}
