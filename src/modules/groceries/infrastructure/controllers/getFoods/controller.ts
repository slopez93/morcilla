import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
} from "@nestjs/common";
import {
  IGroceriesAppService,
  GROCERIES_APP_SERVICE,
} from "src/modules/groceries/application/services/interfaces/IGroceriesAppService";

@Controller()
export class GetFoodsController {
  constructor(
    @Inject(GROCERIES_APP_SERVICE)
    private groceriesAppService: IGroceriesAppService
  ) {}

  @Get("foods")
  async getFoods() {
    try {
      return await this.groceriesAppService.getFoods();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
