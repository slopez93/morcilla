import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
// import { ConfigModule } from '@nestjs/config';
import { GroceriesModule } from 'src/modules/groceries/infrastructure/module';

@Module({
  imports: [
    // ConfigModule.forRoot(),
    GroceriesModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
})
export class AppModule {}
