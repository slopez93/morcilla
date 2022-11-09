import { Injectable } from '@nestjs/common';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocument,
  ExecuteStatementCommand,
  ExecuteStatementCommandInput,
} from '@aws-sdk/lib-dynamodb';

@Injectable()
export class DynamoDbClient {
  public client: DynamoDBDocument;

  constructor() {
    const ddbClient = new DynamoDB({
      region: 'eu-west-1',
    });
    const ddbDocClient = DynamoDBDocument.from(ddbClient);
    this.client = ddbDocClient;
  }

  public async executeStatement(params: ExecuteStatementCommandInput) {
    try {
      const { Items } = await this.client.send(
        new ExecuteStatementCommand(params),
      );
      return Items;
    } catch (err) {
      console.error(err);
      if (err.name == 'ConditionalCheckFailedException') {
        return [];
      } else {
        throw err;
      }
    }
  }
}
