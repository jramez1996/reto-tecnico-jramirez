const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

class PersonRepository {
  async create(person) {
    const params = {
      TableName: "Person",
      Item: person,
    };
    return await dynamodb.put(params).promise();
  }

  async getAll() {
    const result = await dynamodb.scan({ TableName: "Person" }).promise();
    const persons = result.Items; 
    return persons;
  }

  //getAll

  // Puedes agregar otros métodos como find, update, etc.
}

module.exports = PersonRepository;
