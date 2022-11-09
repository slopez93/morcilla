import { CreateFoodDto } from "../dtos/CreateFoodDto";

export class CreateFoodCommand {
  constructor(public food: CreateFoodDto) {}
}
