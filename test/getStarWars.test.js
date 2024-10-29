const { getStarWars } = require('../src/getStarWars'); // Asegúrate de ajustar la ruta

describe('getStarWars', () => {
  it('should retrieve Star Wars characters', async () => {
    const result = await getStarWars();

    // Validar solo la estructura
    const expectedStructure = {
      statusCode: expect.any(Number), // Cambiado a 'statusCode'
      body: expect.any(String), // Esperando una cadena JSON
      headers: {
        "Content-Type": "application/json",
      },
    };

    expect(result).toEqual(expect.objectContaining(expectedStructure));

    // Valida la estructura del cuerpo
    const body = JSON.parse(result.body); // Analiza la cadena JSON
    expect(body).toEqual(expect.objectContaining({
      personas: expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String), // Verifica que id es una cadena
          nombre: expect.any(String),
          altura: expect.any(String), // Cambiado a String, dependiendo del tipo que esperas
          masa: expect.any(String), // Cambiado a String, dependiendo del tipo que esperas
          colorPelo: expect.any(String),
          colorOjos: expect.any(String),
          anioNacimiento: expect.any(String), // Cambiado a String para el año
          genero: expect.any(String),
          planetaNatal: expect.any(String), // Verifica que planetaNatal es una cadena
        }),
      ]),
    }));
  });
});
