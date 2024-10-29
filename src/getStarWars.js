const axios = require('axios');

const getStarWars = async (event) => {
  try {
    const response = await axios.get('https://swapi.py4e.com/api/people/?format=json');
    const characters = response.data.results.map(char => ({
      id: char.url.split('/').slice(-2, -1)[0],
      nombre: char.name,
      altura: char.height,
      masa: char.mass,
      colorPelo: char.hair_color,
      colorOjos: char.eye_color,
      anioNacimiento: char.birth_year, // Corregido a "anioNacimiento"
      genero: char.gender,
      planetaNatal: char.homeworld,
    }));
    
    return {
      statusCode: 200, // Cambié 'status' a 'statusCode'
      body: JSON.stringify({ personas: characters }), // Cambié 'Personas' a 'personas' y usé JSON.stringify
      headers: {
        "Content-Type": "application/json", // Añadí cabecera para indicar tipo de contenido
      },
    };
  } catch (error) {
    console.error("Error fetching Star Wars characters:", error); // Registro del error
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los personajes' }),
      headers: {
        "Content-Type": "application/json", // Añadí cabecera para indicar tipo de contenido
      },
    };
  }
};

module.exports = {
  getStarWars,
};
