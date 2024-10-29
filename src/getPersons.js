const AWS = require("aws-sdk");

const mapAttributes = (person) => ({
  identidadNacional: person.nationalIdentity,
  genero: person.gender, // Considera usar "hombre" o "mujer" si es necesario
  nombre: person.name,
  ubicacion: person.location,
  fechaNacimiento: person.dateBirth, // Corrige a "fechaNacimiento"
});

const getPersons = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const result = await dynamodb.scan({ TableName: "Person" }).promise();
    const persons = result.Items.map(mapAttributes); // Cambié "Persons" a "persons" para seguir convenciones de nomenclatura

    return {
      statusCode: 200, // Cambié 'status' a 'statusCode'
      body: JSON.stringify({ personas: persons }), // Convertir a JSON
      headers: {
        "Content-Type": "application/json", // Indica que la respuesta es JSON
      },
    };
  } catch (error) {
    console.error("Error fetching data from DynamoDB:", error); // Mejorar el mensaje de error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal Server Error" }), // Convertir a JSON
      headers: {
        "Content-Type": "application/json", // Indica que la respuesta es JSON
      },
    };
  }
};

module.exports = {
  getPersons,
};
