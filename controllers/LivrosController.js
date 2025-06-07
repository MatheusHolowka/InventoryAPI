// controllers/LivrosController.js
import db from '../conf/db.js';

/* CRUD - LIVROS CONTROLLER */
const addLivro = (req, res) => {
    const { Titulo, Autor, Editora, Genero, Ano, ISBN, QuantidadeDisponivel } = req.body;
    const query = `INSERT INTO Livros (Titulo, Autor, Editora, Genero, Ano, ISBN, QuantidadeDisponivel) VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(query, [Titulo, Autor, Editora, Genero, Ano, ISBN, QuantidadeDisponivel], (err, result) => {
        if (err) {
            console.error('Erro ao adicionar o livro:', err.message, err.stack);
            return res.status(500).json({ error: 'Erro ao adicionar o livro' });
        }
        res.json({ message: 'Livro adicionado com sucesso', id: result.insertId });
    });
};

const getLivro = (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM Livros WHERE ID = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao obter o livro:', err.message, err.stack);
            return res.status(500).json({ error: 'Erro ao obter o livro' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json(result[0]);
    });
};

const getLivros = (req, res) => {
    let query = 'SELECT * FROM Livros';
    const params = [];

    console.log('Recebendo requisição para getLivros:', req.query); // Log da requisição

    if (req.query.search) {
        const search = `%${req.query.search}%`;
        query += ` WHERE Titulo LIKE ? OR Autor LIKE ? OR Genero LIKE ?`;
        params.push(search, search, search);
    }

    if (req.query.sortKey && req.query.sortOrder) {
        const sortKey = req.query.sortKey;
        const sortOrder = req.query.sortOrder.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
        const allowedSortKeys = ['Titulo', 'Autor', 'Ano', 'QuantidadeDisponivel'];
        if (allowedSortKeys.includes(sortKey)) {
            query += ` ORDER BY ${sortKey} ${sortOrder}`;
        } else {
            query += ' ORDER BY Titulo ASC';
        }
    } else {
        query += ' ORDER BY Titulo ASC';
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;
    query += ` LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    console.log('Executando query:', query, 'com parâmetros:', params); // Log da query

    db.query(query, params, (err, result) => {
        if (err) {
            console.error('Erro ao executar query em getLivros:', err.message, err.stack);
            return res.status(500).json({ error: 'Erro ao obter os livros' });
        }
        console.log('Resultados da query:', result.length, 'livros encontrados'); // Log do resultado
        db.query('SELECT COUNT(*) AS total FROM Livros', (err, count) => {
            if (err) {
                console.error('Erro ao contar total de livros:', err.message, err.stack);
                return res.status(500).json({ error: 'Erro ao obter o total de livros' });
            }
            console.log('Total de livros:', count[0].total); // Log do total
            res.json({ data: result, total: count[0].total });
        });
    });
};

const updateLivro = (req, res) => {
    const id = req.params.id;
    const { Titulo, Autor, Editora, Genero, Ano, ISBN, QuantidadeDisponivel } = req.body;
    const query = `UPDATE Livros SET Titulo = ?, Autor = ?, Editora = ?, Genero = ?, Ano = ?, ISBN = ?, QuantidadeDisponivel = ? WHERE ID = ?`;

    db.query(query, [Titulo, Autor, Editora, Genero, Ano, ISBN, QuantidadeDisponivel, id], (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o livro:', err.message, err.stack);
            return res.status(500).json({ error: 'Erro ao atualizar o livro' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json({ message: 'Livro atualizado com sucesso' });
    });
};

const deleteLivro = (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM Livros WHERE ID = ?`;
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Erro ao deletar o livro:', err.message, err.stack);
            return res.status(500).json({ error: 'Erro ao deletar o livro' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Livro não encontrado' });
        }
        res.json({ message: 'Livro deletado com sucesso' });
    });
};

export default { addLivro, getLivro, getLivros, updateLivro, deleteLivro };