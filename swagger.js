const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'D&D Characters and Deities Api',
        description: 'Api for Characters and Deities from Forgotten Realms Lore'
    },
    host: 'localhost:3000',
    schemes: ['https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./server.js' ];

swaggerAutogen(outputfile, endpointsFiles, doc);