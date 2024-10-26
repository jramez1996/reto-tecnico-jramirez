const { getPerson } = require('../src/getPerson'); // Adjust the path
const AWS = require('aws-sdk');

jest.mock('aws-sdk'); // Mock AWS SDK

describe('getPerson', () => {
  it('should retrieve a person from DynamoDB', async () => {
    // Mock the DynamoDB get method
    const mockDynamoDB = {
      get: jest.fn().mockReturnThis(),
      promise: jest.fn().mockResolvedValue({
        Item: {
          id: '1', // Mocked value, can be any string for structure validation
          nombre: 'Luke Skywalker', // Mocked value, can be any string for structure validation
        },
      }),
    };

    AWS.DynamoDB.DocumentClient.mockImplementation(() => mockDynamoDB);

    const event = {
      pathParameters: { id: '1' },
    };

    const result = await getPerson(event);

    // Check the expected structure of the result
    const expectedStructure = {
      statusCode: expect.any(Number),
      body: expect.any(String), // Expecting a JSON string
    };

    expect(result).toEqual(expect.objectContaining(expectedStructure));

    // Validate the structure of the body
    const body = JSON.parse(result.body); // Parse the JSON string
    expect(body).toEqual(expect.objectContaining({
      personas: expect.objectContaining({
        id: expect.any(String), // Check that id is a string
        nombre: expect.any(String), // Check that nombre is a string
        // Add more fields if necessary
      }),
    }));
  });
});
