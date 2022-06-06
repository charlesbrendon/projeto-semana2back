import mongoose from "mongoose";

const { connect } = mongoose;

export const conectarAoDatabase = () => {
  connect("mongodb://localhost:27017/paletas-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() =>{
    console.log(`MongoDB Conectado`);
  }).catch((err) => {
    console.log(`Erro na conexão com MongoDB: ${err}`)
  })
}

