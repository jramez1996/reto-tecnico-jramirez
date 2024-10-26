const { getStarWars } = require('../src/getStarWars'); // Asegúrate de ajustar la ruta

describe('getStarWars', () => {
  it('should retrieve Star Wars characters', async () => {
    const result = await getStarWars();

    // Validar solo la estructura
    const expectedStructure = {
      status: expect.any(Number),
      body: {
        Personas: expect.any(Array),
      },
    };

    expect(result).toEqual(expect.objectContaining(expectedStructure));
  });
});
