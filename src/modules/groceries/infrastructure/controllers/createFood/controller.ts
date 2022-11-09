import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
} from "@nestjs/common";
import {
  IGroceriesAppService,
  GROCERIES_APP_SERVICE,
} from "src/modules/groceries/application/services/interfaces/IGroceriesAppService";

import { CreateFoodRequest } from "./request";

@Controller()
export class CreateFoodController {
  constructor(
    @Inject(GROCERIES_APP_SERVICE)
    private groceriesAppService: IGroceriesAppService
  ) {}

  @Post("food")
  async createFood(@Body() body: CreateFoodRequest) {
    const { name, image } = body;

    try {
      await this.groceriesAppService.createFood({ name, image });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
