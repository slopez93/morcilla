import { Inject, Injectable, Logger } from "@nestjs/common";
import { addDays, isBefore } from "date-fns";
import { Food } from "src/modules/groceries/domain/entities/Food";
import { ShoppingList } from "../entities/ShoppingList";
import { FoodExistInShoppingListException } from "../exceptions/FoodExistInShoppingListException";
import {
  ShoppingListRepository,
  SHOPPING_REPOSITORY,
} from "../repositories/ShoppingListRepository";

@Injectable()
export class AddFoodToShoppingListService {
  constructor(
    private logger: Logger,
    @Inject(SHOPPING_REPOSITORY) private repository: ShoppingListRepository
  ) {}

  public async addFood(food: Food, nextShoppingList: boolean = false) {
    const currentDate = new Date();
    const nextShoppingListDate = addDays(currentDate, 1);
    const maxDate = new Date().setHours(20, 0, 0, 0);

    this.logger.log("Adding food to shopping list");

    let currentShoppingList =
      isBefore(currentDate, maxDate) || !nextShoppingList
        ? await this.repository.getShoppingListByDate(currentDate)
        : await this.repository.getShoppingListByDate(nextShoppingListDate);

    if (!currentShoppingList) {
      currentShoppingList = ShoppingList.create({
        createdAt:
          isBefore(currentDate, maxDate) || !nextShoppingList
            ? currentDate
            : nextShoppingListDate,
      });
    }

    const existFoodInList = currentShoppingList.foods.find(
      (f) => f.name.toLocaleLowerCase() === food.name.toLocaleLowerCase()
    );

    if (existFoodInList) {
      throw new FoodExistInShoppingListException(
        `Food ${food.name} already exist in the shooping list`
      );
    }

    currentShoppingList.addFood(food);

    await this.repository.save(currentShoppingList);
  }
}
