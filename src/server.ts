import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { createConnection } from 'typeorm';

createConnection()
  .then(async connection => {
    console.log('Successfully connected to database...');
    const app = express();

    app.use(helmet());
    app.use(cors()); // TODO: check cors
    app.use(express.json());

    app.listen(3000, () => {
      console.log(`Listening on port 3000...`);
    });
  })
  .catch(error => console.log(error));
