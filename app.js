const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const disorderRoutes = require('./routes/disorderRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const patientRoutes = require('./routes/patientRoutes');

const app = express();

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hospital API',
      version: '1.0.0',
      description: 'API for managing disorders, doctors, and patients',
    },
  },
  apis: ['./routes/*.js', './models/*.js'], // Path to the files where you define routes and models
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

// Serve Swagger API docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json()); // Body parser middleware
app.use('/disorders', disorderRoutes);
app.use('/doctors', doctorRoutes);
app.use('/patients', patientRoutes);

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});
