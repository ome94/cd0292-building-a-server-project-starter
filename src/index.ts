import express from 'express';
import api from './api/api';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server started at port ${port}!`);
});

export default app;
