import { CommandBus } from "@nestjs/cqrs";
import { DynamoDBStreamEvent } from "aws-lambda";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { AttributeValue } from "@aws-sdk/client-dynamodb";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "src/shared/nestjs/app.module";
import { SendFoodAddedNotificationCommand } from "src/modules/shoppingList/application/commands/SendFoodAddedNotificationCommand";

export async function handler(event: DynamoDBStreamEvent) {
  const app = await NestFactory.createApplicationContext(AppModule);
  const commandBus = app.get(CommandBus);

  for (const record of event.Records) {
    if (!record.dynamodb.NewImage) {
      continue;
    }
    const item = unmarshall(
      record.dynamodb.NewImage as {
        [key: string]: AttributeValue;
      }
    );

    
    if (item.foods.length === 0) {
        continue;
    }

    const foods = item.foods.map((it: { name: string }) => it.name);
    await commandBus.execute(new SendFoodAddedNotificationCommand(foods));
  }
}
