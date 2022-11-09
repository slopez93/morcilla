import { NestFactory } from "@nestjs/core";
import { Context, APIGatewayEvent } from "aws-lambda";
import { AppModule } from "src/shared/nestjs/app.module";
import { MigrateShoppingListController } from "./controller";

export const handler = async (event: APIGatewayEvent, context: Context) => {
  const app = await NestFactory.createApplicationContext(AppModule);
  const Controller = app.get(MigrateShoppingListController);

  await Controller.execute();
};
