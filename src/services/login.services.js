// importando model para acessar usuarios
import Usuario from '../models/usuarios.model';
// importando bibliotecas de segurança
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

class LoginServices {
  // Função de login, assincronca por chamar método da model do mongoose
  // Recebe email e senha para tentativa de login

  async realizarLogin({ email, senha }) {
    // Buscar email e senha para tentiva de loginRouter
    const usuario = await Usuario.findOne({ email: email })
    //verifação do email e retorno de resposta caso ele não seja encontrado
    if (!usuario) {
        return { status: 400, mensagem: 'Email incorreto' };
    }

    // Comparar senha com senha criptograda do banco de dados
    const senhaValida = await bcryptjs.compare(senha, usuario.senha)
    //verificação da senha e retorno da resposta caso não seja válida
    if(senhaValida === false){
        return { status: 400, mensagem: 'Senha incorreta'}
    }

    // Caso tudo esteja correto, o jsonwebtoken irá gerar um token e o retornrá para o usuário
    // O JWT sign recebe 3 parâmetros:
    // - O primeiro são os dados do usuário que está gerando o token
    // - O segundo é a chave de identificação do token (deve ser uma chave secreta)
    // - O Terceiro são as configurações do token, (aqui estamos configurando apenas o tempo de expiração)
    const token = jwt.sign({ email: email }, 'chave_secreta', {
        expiresIn: '24h',
      });

      // Retornamos uma resposta positiva e o token para o controller
      return { status: 200, token: token };
    }
  }

  // async realizarLogin({ email, senha }) {
  //   const usuario = await Usuario.findOne({ email: email });
  //   if (!usuario) {
  //     return'email incorreto'
  //   }
    
  //   if (usuario.senha !== senha) {
  //     return 'senha incorreta'
  //   }

  //   return 'Login bem sucedido'
  // }

// exportando serviços de autenticação de login
export default LoginServices;
