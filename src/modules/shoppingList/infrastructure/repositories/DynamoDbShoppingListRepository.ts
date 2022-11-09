import { Injectable } from "@nestjs/common";
import { formatISO } from "date-fns";
import { Food } from "src/modules/groceries/domain/entities/Food";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { ShoppingList } from "../../domain/entities/ShoppingList";
import { ShoppingListRepository } from "../../domain/repositories/ShoppingListRepository";

@Injectable()
export class DynamoDbShoppingListRepository implements ShoppingListRepository {
  private readonly tableName: string;

  constructor(private dynamDb: DynamoDbClient) {
    this.ensureEnvironment();
    this.tableName = process.env.TABLE_NAME;
  }

  public async getShoppingListByDate(
    date: Date = new Date()
  ): Promise<ShoppingList> {
    const currentDate = formatISO(date, { representation: "date" });

    const statement = `SELECT * FROM "${this.tableName}" WHERE pk = 'SHOPPING_LIST#${currentDate}'`;

    const dbItem = await this.dynamDb.executeStatement({
      Statement: statement,
    });

    if (!dbItem || dbItem.length === 0) {
      return;
    }

    const foods = dbItem[0].foods.map((item) =>
      Food.create({
        id: item.id,
        name: item.name,
        image: item.name,
      })
    );

    return ShoppingList.create({
      id: dbItem[0].id,
      foods,
      createdAt: dbItem[0].createdAt,
    });
  }

  public async save(shoppingList: ShoppingList): Promise<void> {
    const dynamoDbConfig = {
      Item: {
        pk: `SHOPPING_LIST#${shoppingList.getDate()}`,
        sk: `SHOPPING_LIST#${shoppingList.id.toString()}`,
        id: shoppingList.id.toString(),
        foods: shoppingList.foods.map((food) => food.toDto()),
        createdAt: shoppingList.createdAt.toISOString(),
      },
      TableName: this.tableName,
    };

    await this.dynamDb.client.put(dynamoDbConfig);
  }

  private ensureEnvironment() {
    if (!process.env.TABLE_NAME) {
      throw new Error("Invalid environment");
    }
  }
}
