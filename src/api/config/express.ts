import express, { Application, Response, NextFunction } from 'express';
import morgan from 'morgan';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import env from '@env';
import routes from '@api/routes/v1';
import * as error from '@api/middlewares/error';
// const strategies = require('./passport');
// const passport = require('passport');

/**
 * Express instance
 * @public
 */
const app: Application = express();

// request logging. dev: console | production: file
app.use(morgan(env.logs));

// parse body params and attache them to req.body
app.use(express.json({ limit: `${env.UPLOAD_LIMIT}mb` }));
app.use(express.urlencoded({ extended: true, limit: `${env.UPLOAD_LIMIT}mb` }));

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req: any, res: Response, next: NextFunction) => {
  req.uuid = `uuid_${Math.random()}`; // use "uuid" lib
  next();
});

// enable authentication
// app.use(passport.initialize());
// passport.use('jwt', strategies.jwt);
// passport.use('facebook', strategies.facebook);
// passport.use('google', strategies.google);

// mount api v1 routes
app.use('/api/v1', routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

// starting express server
app.listen(env.port, () => console.log(`Connected successfully on port ${env.port}`));

export default app;
