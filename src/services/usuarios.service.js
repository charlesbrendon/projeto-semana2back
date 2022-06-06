// importando dados de usuarios do model
import Usuario from '../models/usuarios.model';
// importando bibliotecas de criptgrafia de senha
import bcryptjs from 'bcryptjs';

//criando serviços CRUD usuarios
class UsuariosServices {
  async listarTodos() {
    const usuarios = await Usuario.find();

    // if (usuarios.length === 0) {
    //   throw { status: 404, message: 'Nenhum usuário cadastrado' };
    // }

    return usuarios;
  }

  async listarUsuarioPorID({ id }) {
    const usuarioSelecionado = await Usuario.findById(id);

    return usuarioSelecionado;
  }

  async CriarNovoUsuario({ email, nome, senha, adm }) {
    //Criptografamos a senha para salvar ela no banco de dados
    //bcryptjs recebe 2 paramêtros, o primeiro é a senha e o segundo é o numero de vezes que ela será criptograda
    //Por padrão é usado 8
    const senhaCriptografada = await bcryptjs.hash(senha, 8);

    const novoUsuario = {
      email,
      nome,
      senha: senhaCriptografada,
      adm,
    };
    try {
      const usuario = await Usuario.create(novoUsuario);

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async atualizarUsuario({ id, email, nome, senha, adm }) {
    const senhaCriptografada = await bcryptjs.hash(senha, 8);
    const usuarioAtualizado = {
      email,
      nome,
      senha: senhaCriptografada,
      adm,
    };

    try {
      await Usuario.updateOne({ _id: id }, usuarioAtualizado);

      const usuario = await Usuario.findById(id);

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  async excluirUsuario({ id }) {
    await Usuario.findByIdAndDelete(id);
  }
}
// exportando serviços SCRUD de usuarios
export default UsuariosServices;
