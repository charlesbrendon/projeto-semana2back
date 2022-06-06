//importando serviços de autenticação de login para
import LoginServices from '../services/login.services'

const loginServices = new LoginServices();
// para tentativa de login iremos pegar email e senha do corpo da requisição e fazer as verificações importadas dos serviços
// Iremos retornar uma resposta dinâmica, dependendo do que for acontecer na requisição 
class LoginControllers {
    async realizarlogin(req, res) {
        const { email, senha } = req.body;
        
        const login = await loginServices.realizarLogin({ email, senha });

        // if(login.status === 400){
        //     return res.status(login.status).send(login.mensagem);
        // }

        // res.status(login.status).send({ token: login.token})
        res.send(login)
    }

}

// exportando controlador de login
export default LoginControllers;

