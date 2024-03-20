const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'D&D Characters and Deities Api',
        description: 'Api for Characters and Deities from Forgotten Realms Lore'
    },
    host: 'cse-341-project2-mgw5.onrender.com',
    schemes: ['https']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./server.js' ];

swaggerAutogen(outputfile, endpointsFiles, doc);