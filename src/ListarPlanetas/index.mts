import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

export const handler = async (event) => {
  try {
    // Realiza un "scan" para obtener todos los ítems de la tabla de planetas
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.PLANETAS_TABLE_NAME,
      })
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Consulta exitosa de todos los planetas",
        data: result.Items, // Aquí se devuelven todos los ítems
      }),
    };
  } catch (error) {
    console.error("Error consultando planetas:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error al consultar planetas",
        error: error.message,
      }),
    };
  }
};
