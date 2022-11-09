import { IsNotEmpty, IsString } from "class-validator";

export class CreateFoodRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  image: string;
}
