const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");

const addPerson = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const { nationalIdentity, name, gender, location, eyeColor, dateBrith } = event.body;
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
      dateBrith,
      createdAt,
      done: false,
    };

    await dynamodb
      .put({
        TableName: "Person",
        Item: newPerson,  // Aquí no necesitas JSON.stringify()
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newPerson),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }), // Cambié a error.message para mayor claridad
    };
  }
};

module.exports = addPerson;