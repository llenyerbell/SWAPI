import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event) => {
  try {
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.PERSONAJES_TABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Consulta exitosa de todos los personajes",
        data: result.Items,
      }),
    };
  } catch (error) {
    console.error("Error consultando personajes:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al consultar personajes",
        error: error.message,
      }),
    };
  }
};
