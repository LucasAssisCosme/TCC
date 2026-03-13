const conn = require("../config/banco");

module.exports = {
  login: (email, senha, callback) => {
    //Criar variavel sql que guarda a consulta
    const sql = `SELECT * FROM usuarios WHERE email = ? AND senha = ?`;

    // Valores que serão utilizados na consulta
    const valores = [email, senha];

    //Executar o comando no banco
    conn.query(sql, valores, (erro, resultados) => {
      //Lidar com erro
      if (erro) {
        return callback(erro, null);
      }

      // Retorna resultado para o controller
      callback(null, resultados[0] || null);
    });
  },

  //Criar = CREATE
  salvar: (
    { nome, email, senha, foto_perfil, bio, genero_favorito, tipo, apelido },
    callback,
  ) => {
    //Variavel sql que guarda a consulta desejada
    const sql = `INSERT INTO usuarios (nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido) VALUES(?,?,?,?,?,?,?,?) `;

    // Valores que serão utilizados na consulta
    const valores = [
      nome,
      email,
      senha,
      foto_perfil,
      bio,
      genero_favorito,
      tipo,
      apelido,
    ];

    conn.query(sql, valores, (erro, resultado) => {
      console.log("Valores enviados:", valores);  // Para ver os dados
      if(erro){
          console.log("Erro no insert:", erro);
          return callback(erro, null);
      }
      console.log("Resultado do insert:", resultado);  // Deve mostrar insertId
      const novoUsuario = {id: resultado.insertId, nome,email,senha,foto_perfil, bio, genero_favorito, tipo, apelido};
      callback(null, novoUsuario);
    });
  },
  listarTodos: (callback) => {
    //Variavel sql que guarda a consulta desejada
    const sql = `SELECT * FROM usuarios`;

    //Executar o comando no banco
    conn.query(sql, (erro, resultados) => {
      if (erro) {
        return callback(erro, null);
      }
      callback(null, resultados);
    });
  },

  //Atualizar = UPDATE
  //Buscar usuario
  buscarPorid: (id, callback) => {
    const sql = `SELECT * FROM  usuarios WHERE id = ?`;
    const valor = [id];
    conn.query(sql, valor, (erro, resultado) => {
      if (erro) {
        return callback(erro, null);
      }
      callback(null, resultado[0] || null);
    });
  },

esqueceuSenha: (email, senha, id, callback) => {

  const sql = `UPDATE usuarios SET senha = ? WHERE id = ? AND email = ?`
  const valores = [senha, id, email]

  conn.query(sql, valores, (erro, resultado) => {

    if (erro) {
      return callback(erro, null)
    }

    if (resultado.affectedRows === 0) {
      return callback(new Error("Email ou usuário não encontrado"), null)
    }

    const usuarioAtualizado = {
      id,
      email,
      senha
    }

    callback(null, usuarioAtualizado)
  })
}, 
 atualizar: (id, dados, callback) => {
  // Filtrar apenas campos com valores válidos (não undefined e não vazios)
  const camposValidos = {};
  Object.keys(dados).forEach(key => {
    if (dados[key] !== undefined && dados[key] !== '') {
      camposValidos[key] = dados[key];
    }
  });

  // Se nenhum campo for válido, retorne erro
  if (Object.keys(camposValidos).length === 0) {
    return callback(new Error('Nenhum campo válido para atualizar'), null);
  }

  // Construir a parte SET da query dinamicamente
  const setClause = Object.keys(camposValidos).map(key => `${key} = ?`).join(', ');
  const valores = Object.values(camposValidos);
  valores.push(id);  // Adicionar id no final para WHERE

  const sql = `UPDATE usuarios SET ${setClause} WHERE id = ?`;

  conn.query(sql, valores, (erro, resultado) => {
    if (erro) {
      return callback(erro, null);
    }
    // Retornar o objeto atualizado (opcional: busque do banco ou retorne os campos atualizados)
    callback(null, { id, ...camposValidos });
  });
},
  deletar: (id, callback) => {
    //Variavel sql que guarda a consulta desejada
    const sql = `DELETE FROM usuarios WHERE id = ?`;
    //Variavel com informação oculta/misteriosa
    const valor = [id];

    //Executar o comando no banco
    conn.query(sql, valor, (erro, resultado) => {
      if (erro) {
        return callback(erro, null);
      }
      callback(null, resultado.affectedRows > 0);
    });
  },
};
