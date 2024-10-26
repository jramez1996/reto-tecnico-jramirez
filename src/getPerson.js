const AWS = require("aws-sdk");

const getPerson = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  const result = await dynamodb
    .get({
      TableName: "Person",
      Key: { id },
    })
    .promise();

  const person = result.Item;
  
  return {
    statusCode: 200, // Asegúrate de usar 'statusCode' en lugar de 'status'
    body: JSON.stringify({personas:person}), // Debes seguir devolviendo como string
    headers: {
      "Content-Type": "application/json", // Indica que la respuesta es JSON
    },
  };
};

module.exports = {
  getPerson,
};
