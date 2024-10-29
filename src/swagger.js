const fs = require('fs');
const path = require('path');
module.exports.swagger = async (event) => {
  try {
    const filePath = path.join(__dirname, '../swagger-ui.html');
    const swaggerUI = fs.readFileSync(filePath, 'utf8');


    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: swaggerUI,
    };
  } catch (error) {
    console.error('Error loading swagger-ui.html:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

