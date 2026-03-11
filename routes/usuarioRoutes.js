//Importação ((pegar)) do modulo express
const express = require("express")
//criando uma variavel para gerenciar as rotas dos usuarios
const roteador = express.Router()

//Importando tudo que tem no arquivo de controller do usuario 
const usuarioControler = require("../controllers/usuarioControler")


//Crud

//C = Criar novo usuario 
//Rota para solicitar a página de cadastro
roteador.get("/cadastrar", usuarioControler.usuarioCadastro)
//Rota para enviar dados da página de cadastro
roteador.post("/cadastrar", usuarioControler.salvarUsuario)


//R = Obter informações de usuarios
//Retorna as informações de todos os usuarios
roteador.get("/", usuarioControler.listarUsuario)
//Retorna as informações de um usuário apenas
roteador.get("/:id", usuarioControler.buscarUsuario)

// U = Atualizar um usuario

roteador.post("/:id", usuarioControler.atualizarUsuario)

// D = Deletar um usuario

roteador.get("/deletar/:id", usuarioControler.deletarUsuario)



//Criando a exportação desse arquivo 
module.exports = roteador