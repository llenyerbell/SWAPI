import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const newData = {
      id: body.id || randomUUID(),
      ...body
    };

    await ddbDocClient.send(
      new PutCommand({
        TableName: process.env.DATAFUSIONADALOG_TABLE_NAME,
        Item: newData,
      })
    );

    return {
      statusCode: 201,
      body: JSON.stringify({
        message: "Fusión agregada exitosamente",
        data: newData,
      }),
    };
  } catch (error) {
    console.error("Error agregando fusión:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error agregando fusión",
        error: error.message,
      }),
    };
  }
};
