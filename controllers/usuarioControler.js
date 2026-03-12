const usuarioModels = require("../models/usuarioModels")

module.exports = {

     formLogin(req,res){
        res.render("login", { titulo: "Login" });
     },

     loginUsuario(req,res){
     const { email, senha } = req.body;
    // Manda as informações do objeto para o model
      usuarioModels.login(email, senha, (erro, logado) => {
      if (erro) {
        return res.render("login", {
          titulo: "Login errado",
          erro: "erro no servidor",
        });
      }
      // Se não conseguiu logar, manda uma mensagem de erro
      if (!logado) {
        res.render("login", {
          titulo: "Login errado",
          erro: "Email ou senha inválidos",
        });
      }
      // Se conseguiu manda uma mensagem de confirmação
      else {
        res.status(200);
        res.render("index", { titulo: "Bem vindo", usuario: logado.nome });
      }
    });
     },

    usuarioCadastro(req,res){
         //Reenderiza a pagina de cadastro
         res.render("usuarios/cadastroUsuario", {titulo: "Cadastro"})
    },
    salvarUsuario(req,res){
          const {nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido } = req.body
     
      //Manda as informações para o model
      usuarioModels.salvar({nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido }, (erro, novoUsuario) => {
            //se deu erro, renderiza a mensagem de erro mostrando a mensagem
            if(erro){
              return res.status(500).render("usuarios/erroUsuario", {
                titulo: "Erro",
                mensagem: "Erro ao salvar o usuario"
              })
            }

            //Se deu certo renderiza a pagina de confirmação 
            res.render("usuarios/confirmacaoUsuario", {
              titulo: "Cadastro confirmado",
              tipo: "cadastro",
              novoUsuario
            })
      })
    },
    mudarSenhaUsuario(req,res){

    },
    atualizarUsuario(req,res){
       const id = req.params.id;
  const { nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido} = req.body;

  usuarioModels.atualizar(id, { nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido }, (erro, atualizado) => {

    if (erro || !atualizado) {
      return res.status(500).render("usuarios/erroUsuario", {
        titulo: "erro",
        mensagem: "Erro ao atualizar usuario"
      });
    }

    res.render("usuarios/confirmacaoUsuario", {
      tipo: "edicao",
      titulo: "Edição confirmada",
      atualizado
    });

  });
    },
    deletarUsuario(req,res){
        const id = req.params.id

     //Acessar model e solicitar a exclusão do usuario
     usuarioModels.deletar(id,(erro, sucesso) => {

            if(erro || !sucesso){
            return res.status(500).render("usuarios/erroUsuario", {
              titulo: "erro",
              mensagem: "Erro ao deletar usuario"
            })
          }

          const deletado = { usuario: "Selecionado"}
          //Renderiza a tela de sucesso
          res.render("usuarios/confirmacaoUsuario", {
            tipo: "excluir",
            titulo: "usuario deletado",
            deletado
          })
     })
    }
}