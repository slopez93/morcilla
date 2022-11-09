import { Inject, Logger } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { addDays } from "date-fns";
import { ShoppingList } from "../../domain/entities/ShoppingList";
import {
  ShoppingListRepository,
  SHOPPING_REPOSITORY,
} from "../../domain/repositories/ShoppingListRepository";
import { MigrateShoppingListsCommand } from "../commands/MigrateShoppingListsCommand";

@CommandHandler(MigrateShoppingListsCommand)
export class MigrateShoppingListsCommandHandler
  implements ICommandHandler<MigrateShoppingListsCommand>
{
  constructor(
    private logger: Logger,
    @Inject(SHOPPING_REPOSITORY) private repository: ShoppingListRepository
  ) {}

  public async execute(): Promise<void> {
    const promises = [];
    const currentDate = new Date();
    const toDate = addDays(currentDate, 1);
    this.logger.log(
      `Migrating shoping list from ${currentDate.toISOString()} to ${toDate.toISOString()}`
    );

    let currentShoppingList = await this.repository.getShoppingListByDate(
      currentDate
    );

    if (!currentShoppingList) {
      this.logger.log(
        `Current shopping list not exist, creating new one for ${currentDate.toISOString()}`
      );
      currentShoppingList = ShoppingList.create({ createdAt: currentDate });
      promises.push(this.repository.save(currentShoppingList));
    }

    const nextShoppingList = currentShoppingList.migrate();

    await Promise.all([...promises, this.repository.save(nextShoppingList)]);
  }
}
