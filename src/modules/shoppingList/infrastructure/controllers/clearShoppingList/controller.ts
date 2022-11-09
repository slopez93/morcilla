import {
  Controller,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import {
  IShoppingListAppService,
  SHOPPING_LIST_APP_SERVICE,
} from "src/modules/shoppingList/application/services/interfaces/IShoppingListAppService";

@Controller()
export class ClearCurrentShoppingListController {
  constructor(
    @Inject(SHOPPING_LIST_APP_SERVICE)
    private shoppingListAppService: IShoppingListAppService
  ) {}

  @Post("clear")
  @HttpCode(204)
  async clearCurrentShoppingList() {
    try {
      await this.shoppingListAppService.clearCurrentShoppingList();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
