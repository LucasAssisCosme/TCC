const conn = require("../config/banco")

module.exports = {
  login: (email, senha, callback) => {
    //Criar variavel sql que guarda a consulta
      const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`

      // Valores que serão utilizados na consulta
      const valores = [email, senha]

      //Executar o comando no banco
      conn.query(sql, valores, (erro,resultados) => {
             //Lidar com erro 
             if(erro){
              return callback( erro, null)
             }

             // Retorna resultado para o controller
             callback(null, resultados[0] || null)
      })
   },


   //Criar = CREATE
   salvar: ({nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido} ,callback ) => {
        //Variavel sql que guarda a consulta desejada
        const sql = `INSERT INTO usuarios (nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido) VALUES(?,?,?,?,?,?,?,?) `

        // Valores que serão utilizados na consulta
        const valores = [nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido]

        conn.query(sql, valores, (erro, resultado) => {
              if(erro){
              return callback( erro, null)
             }
             const novoUsuario = {id: resultado.insertId, nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido}

             callback(null, novoUsuario)
        })
        
   },
    listarTodos: (callback) => {
     //Variavel sql que guarda a consulta desejada
      const sql = `SELECT * FROM usuarios`

        //Executar o comando no banco
        conn.query(sql, (erro, resultados) => {
        if(erro){
          return callback(erro, null)
        }
        callback(null, resultados)
        })
   },

   //Atualizar = UPDATE
   //Buscar usuario
   buscarPorid: (id, callback) => {
            const sql = `SELECT * FROM  usuarios WHERE id = ?`
            const valor = [ id ]
            conn.query(sql, valor, (erro, resultado) => {

               if(erro){
                    return callback(erro, null)
               }
               callback(null, resultado[0] || null)
            })
            
   },
   atualizar: (id,{nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido}, callback) => {
        //Variavel sql que guarda a consulta desejada
    
      //criar um objeto para retronar para o usuario 
     
    
        const sql = `UPDATE usuarios
      SET nome = ?, email = ?, senha = ?, foto_perfil = ?, bio = ?, genero_favorito = ?, tipo = ?, apelido = ?
      WHERE id = ?
      `
     //Variavel com informação oculta/misteriosa
            const valores = [nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido, id]

             const atualizado = {
          usuario: valores[0] 
      }
             //Executar o comando no banco
            conn.query(sql, valores, (erro, resultado) => {

               if(erro){
                    return callback(erro, null)
               }
               callback(null, atualizado)
            })

   },
   deletar: (id, callback) => {
            //Variavel sql que guarda a consulta desejada
                 const sql = `DELETE FROM usuarios WHERE id = ?`
                 //Variavel com informação oculta/misteriosa
                 const valor = [id]                  
            
            //Executar o comando no banco
            conn.query( sql, valor, (erro, resultado) => {
                   if(erro){
                    return callback(erro, null)
                   }
                   callback(null, resultado.affectedRows > 0)
            })
}
}
