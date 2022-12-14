import express, { Request, Response } from 'express';
import api from './api/api';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response): void => {
  res.send('Hello!');
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server started at port ${port}!`);
});

export default app;
