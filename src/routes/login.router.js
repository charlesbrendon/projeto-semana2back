import { Router } from 'express';
import LoginControllers from '../controllers/login.controllers';


const loginRouter = Router();
const loginControllers = new LoginControllers();

loginRouter.post('', loginControllers.realizarlogin);


export default loginRouter;
