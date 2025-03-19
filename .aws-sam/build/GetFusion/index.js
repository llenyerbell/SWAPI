var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.mts
var index_exports = {};
__export(index_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(index_exports);
var import_client_dynamodb = require("@aws-sdk/client-dynamodb");
var import_lib_dynamodb = require("@aws-sdk/lib-dynamodb");
var ddbClient = new import_client_dynamodb.DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
var ddbDocClient = import_lib_dynamodb.DynamoDBDocumentClient.from(ddbClient);
var handler = async (event) => {
  try {
    const idPersonaje = event.queryStringParameters?.id;
    if (!idPersonaje) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Falta el par\xE1metro id en la URL." })
      };
    }
    const params = {
      TableName: process.env.DATAFUSIONADALOG_TABLE_NAME,
      FilterExpression: "idPersonaje = :id",
      ExpressionAttributeValues: { ":id": idPersonaje }
    };
    const result = await ddbDocClient.send(new import_lib_dynamodb.ScanCommand(params));
    if (result.Items && result.Items.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: "Registro encontrado", data: result.Items[0] })
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "No se encontr\xF3 un registro con ese idPersonaje." })
      };
    }
  } catch (error) {
    console.error("Error al buscar registro:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al buscar registro", error: error.message })
    };
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
