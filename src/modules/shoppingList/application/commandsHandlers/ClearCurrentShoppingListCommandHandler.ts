import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
  ShoppingListRepository,
  SHOPPING_REPOSITORY,
} from "../../domain/repositories/ShoppingListRepository";
import { ClearCurrentShoppingListCommand } from "../commands/ClearCurrentShoppingListCommand";

@CommandHandler(ClearCurrentShoppingListCommand)
export class ClearCurrentShoppingListCommandHandler
  implements ICommandHandler<ClearCurrentShoppingListCommand>
{
  constructor(
    @Inject(SHOPPING_REPOSITORY) private repository: ShoppingListRepository
  ) {}

  async execute(): Promise<void> {
    const shoppingList = await this.repository.getShoppingListByDate(
      new Date()
    );

    shoppingList.clear();

    await this.repository.save(shoppingList);
  }
}
