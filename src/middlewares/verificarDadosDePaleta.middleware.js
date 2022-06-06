const verificarDadosDePaletaMiddleware = (req, res, next) => {
  const { sabor, descricao, foto, preco } = req.body;

  if (!sabor || !descricao || !foto || !preco) {
    return res.status(422).send('Dados incompletos');
  }

  next();
};

export default verificarDadosDePaletaMiddleware;
