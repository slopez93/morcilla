import { addDays, formatISO } from "date-fns";
import { Food } from "src/modules/groceries/domain/entities/Food";
import { Uuid } from "src/shared/domain/Uuid";

type Params = {
  id?: string;
  foods?: Food[];
  createdAt?: Date;
};

export class ShoppingList {
  public id: Uuid;
  public foods: Food[];
  public createdAt: Date;

  constructor(id: Uuid, foods: Food[], createdAt: Date) {
    this.id = id;
    this.foods = foods;
    this.createdAt = createdAt;
  }

  static create({ id, foods = [], createdAt }: Params) {
    const date = createdAt ? new Date(createdAt) : new Date();
    return new ShoppingList(Uuid.create(id), foods, date);
  }

  public addFood(food: Food) {
    this.foods.push(food);
  }

  public getDate() {
    return formatISO(new Date(this.createdAt), { representation: "date" });
  }

  public isOpen() {}

  public clear() {
    this.foods = [];
  }

  public migrate(): ShoppingList {
    const currentDate = new Date();
    const toDate = addDays(currentDate, 1);

    const nextShoppingList = ShoppingList.create({ createdAt: toDate });
    nextShoppingList.foods = this.foods;

    return nextShoppingList;
  }
}
