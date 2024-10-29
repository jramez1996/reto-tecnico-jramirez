const fs = require('fs');
const path = require('path');
module.exports.openapi = async (event) => {
  try {
    const filePath = path.join(__dirname, '../openapi.yml'); // Asegúrate de que la ruta sea correcta
    const data = fs.readFileSync(filePath, 'utf8');

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/x-yaml',
        'Access-Control-Allow-Origin': '*', // Permitir todos los orígenes
      },
      body: data,
    };
  } catch (error) {
    console.error('Error loading openapi.yml:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

