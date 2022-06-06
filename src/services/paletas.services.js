// importando dados de paleta de models
import Paleta from '../models/paletas.model';

// criando serviços CRUD paletas
// CRUD (Create, Read, Update, Delete) é um acrônimo para as maneiras de se operar em informação armazenada. É um mnemônico para as quatro operações básicas de armazenamento persistente.
class PaletasService {
  async listarTodas() {
    const paletas = await Paleta.find();

    if (paletas.length === 0) {
      throw { status: 404, message: 'Nenhuma paleta encontrada' };
    }

    return paletas;
  }

  async listarUmaPaletaPorId({ id }) {
    const paletaSelecionada = await Paleta.findById(id);

    return paletaSelecionada;
  }

  async criarNovaPaleta({ sabor, descricao, foto, preco }) {
    const novaPaleta = {
      sabor,
      descricao,
      foto,
      preco,
    };
    try {
      const paleta = await Paleta.create(novaPaleta);

      return paleta;
    } catch (error) {
      throw error;
    }
  }

  async atualizarPaleta({ id, sabor, descricao, foto, preco }) {
    const paletaAtualizada = {
      sabor,
      descricao,
      foto,
      preco,
    };

    try {
      await Paleta.updateOne({ _id: id }, paletaAtualizada);

      const paleta = await Paleta.findById(id);

      return paleta;
    } catch (error) {
      throw error;
    }
  }

  async excluirPaleta({ id }) {
    const paleta = await Paleta.findByIdAndDelete(id);

    return paleta;
  }
}
// exportando Serviços CRUD de paletas
export default PaletasService;
