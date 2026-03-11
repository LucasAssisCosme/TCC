const express =  require('express')

const app = express()

const port = 3000

const path = require('path')

const caminho = path.join(__dirname, "views")

const usuarioRoutes = require("./routes/usuarioRoutes")
const livrosRoutes = require("./routes/livrosRoutes")

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use("/livros", livrosRoutes)
app.use("/usuario", usuarioRoutes)

app.set('view engine', 'ejs')

// Definindo 'Atalho' onde buscar as views
app.set("views", path.join(__dirname, "views"))

app.use(express.static('public'))

//Rota de pagina inicial
app.get("/home", (req,res) => {
   res.render("login", {titulo: "Logado"})
})
//Rota inicial do projeto
app.get("/", (req,res) => {
    res.render("login", { titulo: "Login"})
})
// caso digite uma rota que não existe, leva para 404.ejs
app.use((req, res) => {
    res.status(404)
    res.render("404", { titulo: "Pagina de erro"})
})

//Coloca o servidor para funcionar
app.listen(port, () => {
    console.log(`Servidor funcionando em http://localhost:${port}`);
    
})





