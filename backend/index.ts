import express, { Request, Response } from 'express';
import router from './router/router';
import authrouter from './router/authRouter';

import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use(cors());

app.use('/', router);
app.use('/', authrouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
