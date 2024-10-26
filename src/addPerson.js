const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const addPerson = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { nationalIdentity, name, gender, location, eyeColor, dateBirth } = event.body; // Corrige el typo aquí
  const createdAt = new Date();

  try {
    const id = v4();
    const newPerson = {
      id,
      nationalIdentity,
      name,
      gender,
      location,
      eyeColor,
      dateBirth, // Asegúrate de que este sea el nombre correcto
      createdAt,
      done: false,
    };

    await dynamodb.put({
      TableName: "Person",
      Item: newPerson,
    }).promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newPerson),
    };
  } catch (error) {
    console.error("Error adding person:", error); // Agrega logging para depuración
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error al agregar persona", error: error.message }),
    };
  }
};

module.exports = addPerson;
