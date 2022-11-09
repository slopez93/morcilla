import { Logger, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { ShoppingListAppService } from "../application/services/ShoppingListAppService";
import { AddFoodToShoppingListService } from "../domain/services/AddFoodToShoppingListService";
import { DynamoDbShoppingListRepository } from "./repositories/DynamoDbShoppingListRepository";
import { SHOPPING_REPOSITORY } from "../domain/repositories/ShoppingListRepository";
import { AddFoodToShoppingListController } from "./controllers/addFoodToShoppingList/controller";
import { AddFoodToShoppingListCommandHandler } from "../application/commandsHandlers/AddFoodToShoppingListCommandHandler";
import { ClearCurrentShoppingListController } from "./controllers/clearShoppingList/controller";
import { GroceriesModule } from "src/modules/groceries/infrastructure/module";
import { SHOPPING_LIST_APP_SERVICE } from "../application/services/interfaces/IShoppingListAppService";
import { ClearCurrentShoppingListCommandHandler } from "../application/commandsHandlers/ClearCurrentShoppingListCommandHandler";
import { MigrateShoppingListController } from "./controllers/lambda/migrateShoppingList/controller";
import { MigrateShoppingListsCommandHandler } from "../application/commandsHandlers/MigrateShoppingListsCommandHandler";
import { NOTIFICATION_HANDLER } from "../domain/definitions/INotificationHandler";
import { TelegramNotificationHandler } from "./services/TelegramNotificationHandler";
import { SendFoodAddedNotificationCommandHandler } from "../application/commandsHandlers/SendFoodAddedNotificationCommandHandler";

const ShoppingListCommandHandlers = [
  AddFoodToShoppingListCommandHandler,
  ClearCurrentShoppingListCommandHandler,
  MigrateShoppingListsCommandHandler,
  SendFoodAddedNotificationCommandHandler,
];

const ShoppingListQueryHandlers = [];

@Module({
  imports: [CqrsModule, GroceriesModule],
  providers: [
    Logger,
    DynamoDbClient,
    MigrateShoppingListController,
    AddFoodToShoppingListService,
    { useClass: ShoppingListAppService, provide: SHOPPING_LIST_APP_SERVICE },
    { useClass: DynamoDbShoppingListRepository, provide: SHOPPING_REPOSITORY },
    { useClass: TelegramNotificationHandler, provide: NOTIFICATION_HANDLER },
    ...ShoppingListCommandHandlers,
    ...ShoppingListQueryHandlers,
  ],
  controllers: [
    ClearCurrentShoppingListController,
    AddFoodToShoppingListController,
  ],
})
export class ShoppingListModule {}
