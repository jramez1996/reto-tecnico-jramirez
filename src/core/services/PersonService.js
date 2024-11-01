const DynamoDBRepository = require("../../adapters/outbound/dynamoDBRepository");
//import DynamoDBRepository from "../../adapters/outbound/dynamoDBRepository";
class PersonService {
  constructor() {
    this.dynamoDBRepository = new DynamoDBRepository();
  }

  async addPerson(personData) {
    const newPerson = {
      id: Date.now().toString(), // Genera un ID único simple (puedes cambiar esto)
      ...personData,
    };

    await this.dynamoDBRepository.create(newPerson);
    return newPerson;
  }

  async getAll() {
    const persons = await this.dynamoDBRepository.getAll();
    return this.transform(persons);
  }
  async transform(persons) {
    return {
        personas: persons.map(p => ({
            colorOjos: p.eyeColor,
            identidadNacional: p.nationalIdentity,
            ubicacion: p.location,
            id: p.id,
            nombre: p.name,
            genero: p.gender
        }))
    };
}


}

module.exports = PersonService;
