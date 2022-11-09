import { Logger, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DynamoDbClient } from "src/shared/infrastructure/services/DynamoDbClient";
import { GROCERIES_APP_SERVICE } from "../application/services/interfaces/IGroceriesAppService";
import { FOOD_REPOSITORY } from "../domain/repositories/FoodsRepository";
import { GetFoodsController } from "./controllers/getFoods/controller";
import { DynamoDbFoodRepository } from "./repositories/DynamodbFoodRepository";
import { CreateFoodController } from "./controllers/createFood/controller";
import { CreateFoodCommandHandler } from "../application/commandsHandlers/CreateFoodCommandHandler";
import { GetFoodsQueryHandler } from "../application/queryHandlers/GetFoodsQueryHandler";
import { GroceriesAppService } from "../application/services/GroceriesAppService";
import { GetFoodQueryHandler } from "../application/queryHandlers/GetFoodQueryHandler";

const GroceriesCommandHandlers = [CreateFoodCommandHandler];

const GroceriesQueryHandlers = [GetFoodsQueryHandler, GetFoodQueryHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    Logger,
    DynamoDbClient,
    { useClass: GroceriesAppService, provide: GROCERIES_APP_SERVICE },
    { useClass: DynamoDbFoodRepository, provide: FOOD_REPOSITORY },
    ...GroceriesCommandHandlers,
    ...GroceriesQueryHandlers,
  ],
  exports: [{ useClass: DynamoDbFoodRepository, provide: FOOD_REPOSITORY }],
  controllers: [GetFoodsController, CreateFoodController],
})
export class GroceriesModule {}
