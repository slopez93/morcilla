import { ShoppingList } from "../entities/ShoppingList";

export interface ShoppingListRepository {
  getShoppingListByDate(date: Date): Promise<ShoppingList>;
  save(shoppingList: ShoppingList): Promise<void>;
}

export const SHOPPING_REPOSITORY = Symbol("SHOPPING_REPOSITORY");
