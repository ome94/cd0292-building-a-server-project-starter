import express from 'express';
import images from './images/images';

const api = express.Router();

api.get('/', (req, res) => {
  res
    .status(400)
    .send(
      'This is api route, please include an image with <a href="/api/images?filename=&lt;imagename.jpg&gt;&width=&lt;preferred-width&gt;&height=&lt;preferred-height&gt;">/api/images?filename=&lt;imagename.jpg&gt;&width=&lt;preferred-width&gt;&height=&lt;preferred-height&gt;</a>'
    );
});

api.use('/images', images);

export default api;
