import { Injectable, Logger } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AddFoodToShoppingListCommand } from "../commands/AddFoodToShoppingListCommand";
import { ClearCurrentShoppingListCommand } from "../commands/ClearCurrentShoppingListCommand";
import { MigrateShoppingListsCommand } from "../commands/MigrateShoppingListsCommand";
import { IShoppingListAppService } from "./interfaces/IShoppingListAppService";

@Injectable()
export class ShoppingListAppService implements IShoppingListAppService {
  constructor(private logger: Logger, private commandBus: CommandBus) {}

  async addFoodToShoppingList(
    foodId: string,
    nextShoppingList: boolean
  ): Promise<void> {
    await this.commandBus.execute(
      new AddFoodToShoppingListCommand(foodId, nextShoppingList)
    );
  }

  async clearCurrentShoppingList() {
    await this.commandBus.execute(new ClearCurrentShoppingListCommand());
  }

  async migrateShoppingLists() {
    await this.commandBus.execute(new MigrateShoppingListsCommand());
  }
}
