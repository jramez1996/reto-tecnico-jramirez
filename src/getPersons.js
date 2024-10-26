const AWS = require("aws-sdk");

const mapAttributes = (person) => ({
  identidadNacional: person.nationalIdentity,
  genero: person.gender, // Considera usar "hombre" o "mujer" en vez de "men" si es necesario
  nombre: person.name,
  ubicacion: person.location,
  fechaNacimiento: person.dateBirth, // Corrige a "fechaNacimiento"
});

const getPersons = async (event) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  try {
    const result = await dynamodb.scan({ TableName: "Person" }).promise();
    const Persons = result.Items.map(mapAttributes);
    
    return {
      status: 200,
      body: {
        Persons,
      },
    };
  } catch (error) {
    console.error("Error fetching data from DynamoDB", error);
    return {
      status: 500,
      body: {
        error: "Internal Server Error",
      },
    };
  }
};

module.exports = {
  getPersons,
};
