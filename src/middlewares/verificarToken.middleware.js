import jwt from 'jsonwebtoken';

const verificarTokenMiddleware = (req, res, next) => {
    //Verificar se o token foi enviado pelos headers da requisição
    const token = req.headers.authorization;

    // Retornar resposta caso não seja enviado
    if (token === undefined) {
        return res.status(401).send('Token não enviado');
    }

    // Vericar se o token é válido
    // jwt recebe 3 paramentos
    // O token a ser verificado
    // a chave secreta que foi usada na criação do token
    // a função que define se ocorreu erro ou não

    jwt.verify(token, 'chave_secreta', (error, decoded) => {
        if (error) {
            return res.status(401).send('Token inválido')
        }

        next();
    });

};

export default verificarTokenMiddleware
