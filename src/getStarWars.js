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
      aniooNacimiento: char.birth_year,
      genero: char.gender,
      planetaNatal: char.homeworld, // Aquí puedes agregar más campos si es necesario
    }));
    
    return {
      status: 200,
      body: {
        Personas:characters
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Error al obtener los personajes' }),
    };
  }
};


module.exports = {
  getStarWars
};
