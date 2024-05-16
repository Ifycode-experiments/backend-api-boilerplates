import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { errorHandler } from './lib/errors/ErrorHandler';
import { CustomErrorInterface } from './lib/errors/CustomError';
import { NotFoundError } from './lib/errors/Errors';
import { router as appRouter } from './api/routes/app.route';
import { router as demoRouter } from './api/routes/demo.route';
import { router as userAuthRouter } from './api/routes/user.auth.route';
import { router as userRouter } from './api/routes/user.route'
import { configurePassport } from './api/passport-auth-config/passport.config';

dotenv.config();

const app: Express = express();

app.use(morgan('dev'));
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(cors({ origin: [`http://localhost:${process.env.CLIENT_APP_PORT}`, `${process.env.CLIENT_APP_URL}`] }));
configurePassport(app);

//====== Use Routers =======
app.use('/', appRouter);
app.use('/demo', demoRouter);
app.use('/user/auth', userAuthRouter);
app.use('/user', userRouter);
//==========================


//========= Throw Route Not Found Error ==========
app.use(() => {
  throw new NotFoundError("Route Not Found");
});
//==========================================


//====== Error handler Middleware ==========
app.use((err: CustomErrorInterface, req: Request, res: Response, next: NextFunction) => {
  errorHandler.handleError(err, res);
  next();
});
//==========================================

export { app };
