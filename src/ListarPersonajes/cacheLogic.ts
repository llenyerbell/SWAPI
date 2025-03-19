import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand
} from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION });
const docClient = DynamoDBDocumentClient.from(client);

const CACHE_TABLE = process.env.CACHE_TABLE || "cacheTable";
const CACHE_DURATION = 30 * 60; 

export const fetchDataWithCache = async (cacheKey: string): Promise<any> => {

  const cacheItem = await docClient.send(
    new GetCommand({
      TableName: CACHE_TABLE,
      Key: { cacheKey },
    })
  );

  const now = Math.floor(Date.now() / 1000); 
  if (cacheItem.Item && cacheItem.Item.expiresAt > now) {
    console.log(`Devolviendo datos desde el caché para key: ${cacheKey}`);
    return cacheItem.Item.data;
  }

  const freshData = await fetchExternalAPI(cacheKey);

  const expiresAt = now + CACHE_DURATION; 
  await docClient.send(
    new PutCommand({
      TableName: CACHE_TABLE,
      Item: {
        cacheKey,
        data: freshData,
        expiresAt,
      },
    })
  );

  return freshData;
};
async function fetchExternalAPI(cacheKey: string): Promise<any> {
  return { info: `Respuesta para ${cacheKey}`, timestamp: Date.now() };
}
