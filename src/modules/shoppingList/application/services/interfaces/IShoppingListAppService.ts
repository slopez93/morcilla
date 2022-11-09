export interface IShoppingListAppService {
  addFoodToShoppingList(
    foodId: string,
    nextShoppingList: boolean
  ): Promise<void>;
  clearCurrentShoppingList(): Promise<void>;
  migrateShoppingLists(): Promise<void>;
}

export const SHOPPING_LIST_APP_SERVICE = Symbol("ShoppingListAppService");
