import { APIGatewayProxyHandler } from "aws-lambda";
import { NestFactory } from "@nestjs/core";
import { Server } from "http";
import { ExpressAdapter } from "@nestjs/platform-express";
import * as awsServerlessExpress from "aws-serverless-express";
import * as express from "express";
import { AppModule } from "./shared/nestjs/app.module";
import { ValidationPipe } from "@nestjs/common";

let cachedServer: Server;

const bootstrapServer = async (): Promise<Server> => {
  const expressApp = express();
  const adapter = new ExpressAdapter(expressApp);
  const app = await NestFactory.create(AppModule, adapter);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix("api");
  await app.init();
  return awsServerlessExpress.createServer(expressApp);
};

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrapServer();
  }
  return awsServerlessExpress.proxy(cachedServer, event, context, "PROMISE")
    .promise;
};
