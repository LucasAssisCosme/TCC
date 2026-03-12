const livrosModels = require("../models/livrosModels")

module.exports = {
    livroCadastro(req, res) {
        res.render("livros/cadastroLivro", { titulo: "Cadastro" })
    },

    salvarLivro(req, res) {
        const { titulo, autor, genero, ano, numero_paginas, descricao, imagem_capa, editora } = req.body

        livrosModels.guardar({ titulo, autor, genero, ano, numero_paginas, descricao, imagem_capa, editora }, (erro, novoLivro) => {
            if (erro) {
                console.error('falha ao inserir livro:', erro.sqlMessage);
                return res.status(500).render('livros/erroLivro');
            }


            res.render("livros/confirmarLivros", {
                titulo: "Cadastro confirmado",
                tipo: "cadastro",
                novoLivro
            })
        })
    },
    listarLivros(req, res) {
        livrosModels.listarGeral((erro, livros) => {
            if (erro) {
                return res.status(500).render("livros/erroLivro", {
                    titulo: "Erro",
                    mensagem: "Erro ao ver lista livros"
                })
            }
            
            

            res.render("livros/mostrarLivros", {
                titulo: "lista produtos",
                livros
            })
        })
    },
    buscarLivro(req, res) {
        //Buscar id como parametro url
        const id = req.params.id

        //Acessar model para realizar busca
        livrosModels.irPorid(id, (erro, livro) => {
            //Se deu erro na busca, informar
            //ou se não achou usuario
            if (erro || !livro) {
                return res.status(500).render("livros/erroLivro", {
                    titulo: "erro",
                    mensagem: "Erro ao buscar livro"
                })
            }

            
            

            // Se achou usuario, renderiza pagina de ediçõa
            res.render("livros/editarLivro", {
                titulo: "Edição",
                livro
            })
        })
    },
    atualizarLivro(req, res) {
        const id = req.params.id;
        const { titulo, autor, genero, ano, numero_paginas, descricao, imagem_capa, editora } = req.body;

        livrosModels.Renovar(id, { titulo, autor, genero, ano, numero_paginas, descricao, imagem_capa, editora }, (erro, atualizado) => {

            if (erro || !atualizado) {
                return res.status(500).render("livros/erroLivro", {
                    titulo: "erro",
                    mensagem: "Erro ao atualizar livro"
                });
            }

             
            res.render("livros/confirmarLivros", {
                tipo: "edicao",
                titulo: "Edição confirmada",
                atualizado
            });

        });

    },
    deletarLivro(req, res) {
        const id = req.params.id

        //Acessar model e solicitar a exclusão do usuario
        livrosModels.deletar(id, (erro, sucesso) => {

            if (erro || !sucesso) {
                return res.status(500).render("livros/erroLivro", {
                    titulo: "erro",
                    mensagem: "Erro ao deletar livro"
                })
            }

      

            const deletado = { livro: "Selecionado" }
            // Renderiza a tela de sucesso
            res.render("livros/confirmarLivros", {
                tipo: "excluir",
                titulo: "livro deletado",
                deletado
            })
        })
    }
}