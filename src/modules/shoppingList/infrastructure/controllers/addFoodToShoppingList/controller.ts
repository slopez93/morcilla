import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import {
  IShoppingListAppService,
  SHOPPING_LIST_APP_SERVICE,
} from "src/modules/shoppingList/application/services/interfaces/IShoppingListAppService";
import { FoodExistInShoppingListException } from "src/modules/shoppingList/domain/exceptions/FoodExistInShoppingListException";
import { AddFoodToShoppingListRequest } from "./request";

@Controller()
export class AddFoodToShoppingListController {
  constructor(
    @Inject(SHOPPING_LIST_APP_SERVICE)
    private shoppingAppService: IShoppingListAppService
  ) {}

  @Post("addFood")
  async addFoodToShoppingList(@Body() body: AddFoodToShoppingListRequest) {
    const { foodId, nextShoppingList } = body;

    try {
      await this.shoppingAppService.addFoodToShoppingList(
        foodId,
        nextShoppingList
      );
    } catch (error) {
      if (error instanceof FoodExistInShoppingListException) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
