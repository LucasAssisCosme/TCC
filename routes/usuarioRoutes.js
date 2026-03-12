//Importação ((pegar)) do modulo express
const express = require("express")
//criando uma variavel para gerenciar as rotas dos usuarios
const roteador = express.Router()

//Importando tudo que tem no arquivo de controller do usuario 
const usuarioControler = require("../controllers/usuarioControler")


//Crud
roteador.get("/login", usuarioControler.formLogin)
//Rota para enviar dados da página de login
roteador.post("/login", usuarioControler.loginUsuario)
//C = Criar novo usuario 
//Rota para solicitar a página de cadastro
roteador.get("/cadastrar", usuarioControler.usuarioCadastro)
//Rota para enviar dados da página de cadastro
roteador.post("/cadastrar", usuarioControler.salvarUsuario)
//Rota mudar senha
roteador.post("/esqueceuSenha", usuarioControler.mudarSenhaUsuario)

//R = Obter informações de usuarios
//Retorna as informações de todos os usuarios

// U = Atualizar um usuario

roteador.patch("/:id", usuarioControler.atualizarUsuario)

// D = Deletar um usuario

roteador.delete("/deletar/:id", usuarioControler.deletarUsuario)



//Criando a exportação desse arquivo 
module.exports = roteador