const { getPersons } = require('../src/getPersons'); // Ajusta la ruta según tu estructura
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

describe('getPersons', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    
    // Mock the DynamoDB.DocumentClient and set the region
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, {
        Items: [
          { 
            nationalIdentity: '123456789', 
            gender: 'male', 
            name: "John Doe", 
            location: 'Earth', 
            dateBirth: '2000-01-01' 
          },
          { 
            nationalIdentity: '987654321', 
            gender: 'female', 
            name: "Jane Doe", 
            location: 'Earth', 
            dateBirth: '1990-01-01' 
          }
        ],
        Count: 2,
        ScannedCount: 2,
      });
    });
  });

  afterAll(() => {
    AWSMock.restore('DynamoDB.DocumentClient');
  });

  it('should retrieve persons from DynamoDB', async () => {
    const result = await getPersons();
    
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
          identidadNacional: expect.any(String), // Verifica que es una cadena
          genero: expect.any(String),
          nombre: expect.any(String),
          ubicacion: expect.any(String),
          fechaNacimiento: expect.any(String),
        }),
      ]),
    }));
  });
});
