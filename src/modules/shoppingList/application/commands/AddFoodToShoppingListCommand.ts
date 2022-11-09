export class AddFoodToShoppingListCommand {
  constructor(public foodId: string, public nextShoppingList: boolean) {}
}
