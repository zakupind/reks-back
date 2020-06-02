import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet());
app.use(cors()); // TODO: check cors
app.use(express.json());

app.listen(3000, () => {
  console.log('Listening on 3000');
});
