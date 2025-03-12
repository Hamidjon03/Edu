module.exports = {
    openapi: '3.0.0',
    info: {
      title: 'Edu API',
      version: '1.0.0',
      description: 'API documentation for Edu project'
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
        description: 'Local server'
      }
    ],
    paths: {
      '/api/auth/login': {
        post: {
          summary: 'User login',
          description: 'Logs in a user and returns a JWT token.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string' },
                    password: { type: 'string' }
                  },
                  required: ['username', 'password']
                }
              }
            }
          },
          responses: {
            '200': {
              description: 'JWT token returned',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      token: { type: 'string' }
                    }
                  }
                }
              }
            },
            '401': { description: 'Invalid credentials' }
          }
        }
      }
    }
  };
  