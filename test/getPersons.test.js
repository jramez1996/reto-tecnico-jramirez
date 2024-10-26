const { getPersons } = require('../src/getPersons'); // Adjust the path based on your structure
const AWSMock = require('aws-sdk-mock');
const AWS = require('aws-sdk');

describe('getPersons', () => {
  beforeAll(() => {
    AWSMock.setSDKInstance(AWS);
    
    // Mock the DynamoDB.DocumentClient and set the region
    AWSMock.mock('DynamoDB.DocumentClient', 'scan', (params, callback) => {
      callback(null, {
        Items: [
          { nationalIdentity: undefined, gender: undefined, name: "John Doe", location: undefined, dateBrith: undefined },
          { nationalIdentity: undefined, gender: undefined, name: "Jane Doe", location: undefined, dateBrith: undefined }
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
        status: expect.any(Number),
        body: {
            Persons: expect.any(Array),
        },
    };

    expect(result).toEqual(expect.objectContaining(expectedStructure));
    

  });
});
