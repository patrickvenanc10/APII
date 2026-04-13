const express = require('express');
const app = express();

app.use(express.json());

// 📚 10 registros iniciais
let livros = [
    { id: 1, titulo: "1984", autor: "George Orwell", preco: 30, genero: "Distopia", estoque: 10 },
    { id: 2, titulo: "Dom Casmurro", autor: "Machado de Assis", preco: 25, genero: "Romance", estoque: 15 },
    { id: 3, titulo: "O Hobbit", autor: "J.R.R. Tolkien", preco: 40, genero: "Fantasia", estoque: 8 },
    { id: 4, titulo: "Harry Potter", autor: "J.K. Rowling", preco: 35, genero: "Fantasia", estoque: 20 },
    { id: 5, titulo: "O Alquimista", autor: "Paulo Coelho", preco: 20, genero: "Ficção", estoque: 12 },
    { id: 6, titulo: "It", autor: "Stephen King", preco: 45, genero: "Terror", estoque: 5 },
    { id: 7, titulo: "Percy Jackson", autor: "Rick Riordan", preco: 28, genero: "Fantasia", estoque: 18 },
    { id: 8, titulo: "A Revolução dos Bichos", autor: "George Orwell", preco: 22, genero: "Política", estoque: 9 },
    { id: 9, titulo: "Senhor dos Anéis", autor: "Tolkien", preco: 50, genero: "Fantasia", estoque: 7 },
    { id: 10, titulo: "Capitães da Areia", autor: "Jorge Amado", preco: 27, genero: "Drama", estoque: 14 }
];

let proximoId = 11;


// 🔎 GET ALL (com filtros)
app.get('/api/livros', (req, res) => {

    const { genero, preco_min, preco_max } = req.query;

    let resultado = livros;

    if (genero) {
        resultado = resultado.filter(l => l.genero === genero);
    }

    if (preco_min) {
        resultado = resultado.filter(l => l.preco >= Number(preco_min));
    }

    if (preco_max) {
        resultado = resultado.filter(l => l.preco <= Number(preco_max));
    }

    res.status(200).json(resultado);
});


// 🔎 GET BY ID
app.get('/api/livros/:id', (req, res) => {
    const livro = livros.find(l => l.id === parseInt(req.params.id));

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    res.status(200).json(livro);
});


// ➕ POST
app.post('/api/livros', (req, res) => {

    const { titulo, autor, preco, genero, estoque } = req.body;

    // ✅ Validação completa
    if (!titulo || !autor || preco == null || !genero || estoque == null) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, autor, preco, genero, estoque"
        });
    }

    if (typeof preco !== "number" || preco <= 0) {
        return res.status(400).json({ erro: "Preço inválido" });
    }

    if (!Number.isInteger(estoque) || estoque < 0) {
        return res.status(400).json({ erro: "Estoque inválido" });
    }

    const novoLivro = {
        id: proximoId++,
        titulo,
        autor,
        preco,
        genero,
        estoque
    };

    livros.push(novoLivro);

    res.status(201).json(novoLivro);
});


// ✏️ PUT
app.put('/api/livros/:id', (req, res) => {

    const livro = livros.find(l => l.id === parseInt(req.params.id));

    if (!livro) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    const { titulo, autor, preco, genero, estoque } = req.body;

    if (!titulo || !autor || preco == null || !genero || estoque == null) {
        return res.status(400).json({
            erro: "Campos obrigatórios: titulo, autor, preco, genero, estoque"
        });
    }

    livro.titulo = titulo;
    livro.autor = autor;
    livro.preco = preco;
    livro.genero = genero;
    livro.estoque = estoque;

    res.status(200).json(livro);
});


// ❌ DELETE
app.delete('/api/livros/:id', (req, res) => {

    const index = livros.findIndex(l => l.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).json({ erro: "Livro não encontrado" });
    }

    livros.splice(index, 1);

    res.status(204).send();
});


// 🚨 Middleware de erro global
app.use((err, req, res, next) => {
    res.status(500).json({
        erro: "Erro interno do servidor"
    });
});


app.listen(3000, () => console.log('🚀 API de Livros na porta 3000'));

