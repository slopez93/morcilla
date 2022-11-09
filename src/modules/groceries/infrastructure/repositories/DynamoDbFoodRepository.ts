import { Injectable } from "@nestjs/common";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { Food } from "../../domain/entities/Food";
import { FoodRepository } from "../../domain/repositories/FoodsRepository";

@Injectable()
export class DynamoDbFoodRepository implements FoodRepository {
  private readonly tableName: string;

  constructor(private dynamoDb: DynamoDbClient) {
    this.ensureEnvironment();
    this.tableName = process.env.TABLE_NAME;
  }

  public async getAll(): Promise<Food[]> {
    const statement = `SELECT * from "${this.tableName}" WHERE begins_with("pk", 'FOOD#')`;

    const dbItem = await this.dynamoDb.executeStatement({
      Statement: statement,
    });

    if (!dbItem || dbItem.length === 0) {
      return [];
    }

    return dbItem.map((item) =>
      Food.create({ id: item.id, name: item.name, image: item.image })
    );
  }

  public async getById(foodId: string): Promise<Food> {
    const statement = `SELECT * FROM "${this.tableName}" WHERE pk = 'FOOD#${foodId}'`;

    const dbItem = await this.dynamoDb.executeStatement({
      Statement: statement,
    });

    if (!dbItem || dbItem.length === 0) {
      return;
    }

    return Food.create({
      id: dbItem[0].id,
      name: dbItem[0].name,
      image: dbItem[0].name,
    });
  }

  public async save(food: Food): Promise<void> {
    const dynamoDbConfig = {
      Item: {
        pk: `FOOD#${food.id.toString()}`,
        sk: `FOOD#${food.id.toString()}`,
        id: food.id.toString(),
        name: food.name,
        image: food.image,
      },
      TableName: this.tableName,
    };

    await this.dynamoDb.client.put(dynamoDbConfig);
  }

  private ensureEnvironment() {
    if (!process.env.TABLE_NAME) {
      throw new Error("Invalid environment");
    }
  }
}
