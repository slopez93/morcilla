import { Injectable, Logger } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Food } from "../../domain/entities/Food";
import { CreateFoodCommand } from "../commands/CreateFoodCommand";
import { CreateFoodDto } from "../dtos/CreateFoodDto";
import { GetFoodsQuery } from "../queries/GetFoodsQuery";
import { IGroceriesAppService } from "./interfaces/IGroceriesAppService";

@Injectable()
export class GroceriesAppService implements IGroceriesAppService {
  constructor(
    private logger: Logger,
    private commandBus: CommandBus,
    private queryBus: QueryBus
  ) {}

  async getFoods(): Promise<Food[]> {
    return await this.queryBus.execute(new GetFoodsQuery());
  }

  async createFood(foodDto: CreateFoodDto): Promise<void> {
    await this.commandBus.execute(new CreateFoodCommand(foodDto));
  }
}
