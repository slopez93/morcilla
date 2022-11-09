import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddFoodToShoppingListRequest {
  @IsNotEmpty()
  @IsString()
  foodId: string;

  @IsOptional()
  @IsBoolean()
  nextShoppingList: boolean = false;
}
