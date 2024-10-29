const AWS = require("aws-sdk");

const getPerson = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  try {
    const result = await dynamodb.get({
      TableName: "Person",
      Key: { id: id }, // Ensure the key is correctly defined
    }).promise();

    const person = result.Item;

    if (!person) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Person not found" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ persona: person }), // Singular for clarity
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    console.error("Error fetching person:", error); // Log the error for debugging
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error fetching person", error: error.message }), // Include error message for clarity
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
};

module.exports = {
  getPerson,
};
