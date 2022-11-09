import { Injectable } from "@nestjs/common";
import { INotificationHandler } from "../../domain/definitions/INotificationHandler";

const TelegramBot = require("node-telegram-bot-api");

@Injectable()
export class TelegramNotificationHandler implements INotificationHandler {
  private boot: typeof TelegramBot;
  private telegramGroupId = -820548813;

  constructor() {
    this.ensureValidEnvironment();
    const telegramToken = process.env.TELEGRAM_TOKEN!;
    this.boot = new TelegramBot(telegramToken, { polling: false });
  }

  async sendNotification(msg: string): Promise<void> {
    await this.boot.sendMessage(this.telegramGroupId, msg, {
      parse_mode: "Markdown",
    });
  }

  private ensureValidEnvironment() {
    if (!process.env.TELEGRAM_TOKEN) {
      throw new Error("Invalid TELEGRAM_TOKEN environment");
    }
  }
}
