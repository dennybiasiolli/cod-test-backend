import express from 'express';

import indexRouter from './routes/index';
import eventRouter from './routes/event';


const app: express.Application = express();
const port = 3000;

// for parsing application/json
app.use(express.json())
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

app.use('/', indexRouter);
app.use('/events', eventRouter);

app.listen(port, () => {
  // tslint:disable-next-line:no-console
  console.info(`Example app listening at http://localhost:${port}`);
});
