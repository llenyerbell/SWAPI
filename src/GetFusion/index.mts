import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand  } from "@aws-sdk/lib-dynamodb";
import NodeCache from "node-cache"
const myCache = new NodeCache();

const ddbClient = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);
// Asegúrate de que sea el nombre correcto de tu tabla

export const handler = async (event: any) => {
  try {
    const idPersonaje = event.queryStringParameters?.id; // Obtener el ID desde la URL
    if (!idPersonaje) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falta el parámetro id en la URL." }),
      };
    }
    let recuperar:any = myCache.get(idPersonaje);
    if(recuperar){
      recuperar.id=idPersonaje
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Registro encontrado", data: recuperar }),
      };
    }
    // Consulta en DynamoDB para buscar el registro con idPersonaje
    const params = {
      TableName: process.env.DATAFUSIONADALOG_TABLE_NAME,
      FilterExpression: "idPersonaje = :id",
      ExpressionAttributeValues: { ":id": idPersonaje }
    };
    
    const result = await ddbDocClient.send(new ScanCommand(params));

    if (result.Items && result.Items.length > 0) {
      myCache.set(idPersonaje, result.Items, 1800 );
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Registro encontrado", data: result.Items[0] }),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No se encontró un registro con ese idPersonaje." }),
      };
    }
  } catch (error) {
    console.error("Error al buscar registro:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al buscar registro", error: error.message }),
    };
  }
};
