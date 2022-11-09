import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import {
  INotificationHandler,
  NOTIFICATION_HANDLER,
} from "../../domain/definitions/INotificationHandler";
import { SendFoodAddedNotificationCommand } from "../commands/SendFoodAddedNotificationCommand";

@CommandHandler(SendFoodAddedNotificationCommand)
export class SendFoodAddedNotificationCommandHandler
  implements ICommandHandler<SendFoodAddedNotificationCommand>
{
  constructor(
    @Inject(NOTIFICATION_HANDLER)
    private notificationHandler: INotificationHandler
  ) {}

  async execute({ foods }: SendFoodAddedNotificationCommand): Promise<void> {
    const foodsRaw = foods.map((food) => `*- ${food}* \n`).join(" ");
    await this.notificationHandler.sendNotification(
      `Nuevo alimento añadido a la lista de la compra: \n\n ${foodsRaw}`
    );
  }
}
