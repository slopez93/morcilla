export class FoodNotFound extends Error {
  constructor(foodId: string) {
    super(`Food ${foodId} not found`);
  }
}
