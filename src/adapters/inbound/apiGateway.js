const middy = require("@middy/core");
const httpJSONBodyParser = require("@middy/http-json-body-parser");
const PersonService = require("../../core/services/PersonService");

const StarWarsService = require("../../core/services/StarWarsService");
const personService = new PersonService();
const starWarsService = new StarWarsService();
const addPerson = async (event) => {
  const { nationalIdentity, name, gender, location, eyeColor, dateBrith } = event.body;
  try {
    const newPerson = await personService.addPerson({ nationalIdentity, name, gender, location, eyeColor, dateBrith });

    return {
      statusCode: 201,
      body: JSON.stringify(newPerson),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: JSON.stringify(error) }),
    };
  }
};


const getPersons = async (event) => {
  try {
    const person = await personService.getAll();

    if (!person) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Persons not found" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ person:person }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", event }), // Devuelve event aquí también si lo deseas
      headers: {
        "Content-Type": "application/json",
      },/**/
    };
  }

};
const getStarWars = async (event) => {
  try {
    const startWast = await starWarsService.getStarWars();
    if (!startWast) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "StartWas not found" }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ startWast:startWast }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", event }), // Devuelve event aquí también si lo deseas
      headers: {
        "Content-Type": "application/json",
      },/**/
    };
  }

};

module.exports = {
  addPerson: middy(addPerson).use(httpJSONBodyParser()),
  getPersons,
  getStarWars
};