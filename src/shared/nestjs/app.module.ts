import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { RouterModule } from "nest-router";
import { GroceriesModule } from "src/modules/groceries/infrastructure/module";
import { ShoppingListModule } from "src/modules/shoppingList/infrastructure/module";

@Module({
  imports: [
    ConfigModule.forRoot(),
    RouterModule.forRoutes([
      {
        path: "/groceries",
        module: GroceriesModule,
      },
      {
        path: "/shoppingList",
        module: ShoppingListModule,
      },
    ]),
    GroceriesModule,
    ShoppingListModule,
  ],
})
export class AppModule {}
