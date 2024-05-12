const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

    const options = {
      definition: {
        openapi: '3.0.0',
        info: {
          title: 'Server Metrics',
          description: "API endpoints for a Server Metrics documented on swagger",
          contact: {
            name: "Lgrdev",
            email: "lgrdev@lgrdev.ovh",
            url: "https://github.com/lgrdev/servermetrics"
          },
          version: '1.0.0',
        },
        servers: [
          {
            url: "http://localhost:3002/",
            description: "Local server"
          },
          {
            url: "https://servermetrics.lgrdev.ovh/",
            description: "Live server"
          },
        ]
      },
      // looks for configuration in specified directories
      apis: ['./routes/*.js'],
    }
    const swaggerSpec = swaggerJsdoc(options)
    function swaggerDocs(app, port) {
      // Swagger Page
      app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
      // Documentation in JSON format
      app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json')
        res.send(swaggerSpec)
      })
    }
    module.exports = swaggerDocs;