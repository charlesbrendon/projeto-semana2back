// importando biblioteca router do express
import { Router } from 'express';
// importando controladores de paletass
import PaletasControllers from '../controllers/paletas.controllers';
// importando verificadores 
import verificarIdDePaletaMiddleware from '../middlewares/verificarIdDePaleta.middleware';
import verificarDadosDePaletaMiddleware from '../middlewares/verificarDadosDePaleta.middleware';

const paletasRouter = Router();
const paletasControllers = new PaletasControllers();

paletasRouter.get('/listar-paletas', paletasControllers.listarTodas);

paletasRouter.get('/paleta/:id', 
verificarIdDePaletaMiddleware, 
paletasControllers.listarUmaPaletaPorId);

paletasRouter.post('/criar-paleta', 
verificarDadosDePaletaMiddleware, 
paletasControllers.criarNovaPaleta);

paletasRouter.put('/atualizar-paleta/:id', 
verificarIdDePaletaMiddleware, 
verificarDadosDePaletaMiddleware, 
paletasControllers.atualizarPaleta);

paletasRouter.delete('/excluir-paleta/:id', 
verificarIdDePaletaMiddleware, 
paletasControllers.excluirPaleta);

export default paletasRouter;
