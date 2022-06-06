// importando serviços CRUD de usuarios
import UsuariosServices from '../services/usuarios.service';

const usuariosServices = new UsuariosServices();

// manipulando dados dos usuarios
class UsuariosControllers {
  async listarTodos(req, res) {
    const usuarios = await usuariosServices.listarTodos();
    res.send(usuarios);
  }

  async listarUsuarioPorID(req, res) {
    const id = req.params.id;

    const usuarioSelecionado = await usuariosServices.listarUsuarioPorID({ id });

    res.send(usuarioSelecionado);
  }

  async CriarNovoUsuario(req, res) {
    const { email, nome, senha, adm } = req.body;

    try {
      const usuario = await usuariosServices.CriarNovoUsuario({
        email,
        nome,
        senha,
        adm,
      });
      res.status(201).send(usuario);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send('Email já cadastrado');
      }
    }
  }

  async atualizarUsuario(req, res) {
    const id = req.params.id;
    const { email, nome, senha, adm } = req.body;
    

    try {
      const usuarioAtualizado = await usuariosServices.atualizarUsuario({
        id,
        email,
        nome,
        senha,
        adm,
      });

      res.status(201).send(usuarioAtualizado);
    } catch (error) {
      if (error.code === 11000) {
        res.status(400).send('Email ja está sendo usado por outro Usuário');
      }
    }
  }

  async excluirUsuario(req, res) {
    const id = req.params.id;

    await UsuariosServices.excluirUsuario({ id });

    res.sendStatus(204);
  }
}

// Exportando controladores de usuarios
export default UsuariosControllers;
