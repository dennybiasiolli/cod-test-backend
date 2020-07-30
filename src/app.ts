import express from 'express';

import indexRouter from './routes/index';


const app: express.Application = express();
const port = 3000;

app.use('/', indexRouter);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.info(`Example app listening at http://localhost:${port}`);
});
