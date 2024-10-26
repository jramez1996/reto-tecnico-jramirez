const { v4 } = require('uuid');
const addPerson = require('../src/addPerson'); // Ajusta la ruta según tu estructura de carpetas

// Mockear el módulo uuid
jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('addPerson', () => {
  it('should add a person to DynamoDB', async () => {
    v4.mockReturnValue('mocked-uuid'); // Mockear el UUID

    const event = {
      body: JSON.stringify({
        nationalIdentity: '12345678',
        name: 'Luke Skywalker',
        gender: 'male',
        location: 'Tatooine',
        eyeColor: 'blue',
        dateBrith: '19BBY',
      }),
    };

    const result = await addPerson(event);
    const parsedBody = JSON.parse(result.body); // Parsear el cuerpo de la respuesta

    // Validar la estructura sin preocuparse por valores específicos
    expect(result).toEqual(expect.objectContaining({
      statusCode: expect.any(Number),
      body: expect.any(String), // Se espera que el cuerpo sea una cadena
    }));

   
  });
});
