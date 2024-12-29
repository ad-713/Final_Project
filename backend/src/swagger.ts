import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// Configuration Swagger
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie API',
            version: '1.0.0',
            description: 'API for managing movies',
        },
        components: {
            schemas: {
                movies: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            description: 'The unique identifier for a movie',
                        },
                        title: {
                            type: 'string',
                            description: 'The title of the movie',
                        },
                        year: {
                            type: 'integer',
                            description: 'The release year of the movie',
                        },
                        genre: {
                            type: 'string',
                            description: 'The genre of the movie',
                        },
                    },
                },
            },
        },
    },
    apis: ['./routes/movies.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };