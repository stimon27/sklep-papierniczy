import express from 'express';

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import basketRecordsRouter from './routes/basketRecordsRoute.js';
import complaintsRouter from './routes/complaintsRoute.js';
import favoritesRouter from './routes/favoritesRoute.js';
import ordersRouter from './routes/ordersRoute.js';
import productsRouter from './routes/productsRoute.js';
import orderContentsRouter from './routes/orderContentsRoute.js';

const port = 5000;

const app = express();

app.use(cors());
app.use(helmet());
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/basketRecords', basketRecordsRouter);
app.use('/complaints', complaintsRouter);
app.use('/favorites', favoritesRouter);
app.use('/orders', ordersRouter);
app.use('/products', productsRouter);
app.use('/orderContents', orderContentsRouter);

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something is broken.')
})
  

app.use((req, res, next) => {
    res.status(404).send('Sorry we could not find that.')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})