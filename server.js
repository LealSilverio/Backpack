const express = require('express');
const cors = require('cors');
const db = require('./db/database');

const port = process.env.PORT || 8080;
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

app
  .use(cors())
  .use('/', require('./routes'))
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
;

// Connect to the MongoDB server
db.connectDB((err) => {
    if (err) {
      console.log(err);
    } else {
      app.listen(port);
      console.log(`Listening on port ${port}`);
    }
});
