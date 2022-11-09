import { Inject, Injectable } from "@nestjs/common";
import {
  IShoppingListAppService,
  SHOPPING_LIST_APP_SERVICE,
} from "src/modules/shoppingList/application/services/interfaces/IShoppingListAppService";

@Injectable()
export class MigrateShoppingListController {
  constructor(
    @Inject(SHOPPING_LIST_APP_SERVICE)
    private shoppingListAppService: IShoppingListAppService
  ) {}

  public async execute() {
    try {
      await this.shoppingListAppService.migrateShoppingLists();
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
