import db from '../db.js';

export const getEmprestimos = (req, res) => {
  db.query("SELECT * FROM Emprestimos", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

export const getEmprestimoById = (req, res) => {
  db.query("SELECT * FROM Emprestimos WHERE ID = ?", [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

export const createEmprestimo = (req, res) => {
  const q = `
    INSERT INTO Emprestimos (IDLivro, IDUsuario, DataEmprestimo, DataDevolucao, Status)
    VALUES (?, ?, ?, ?, ?)
  `;
  const values = [
    req.body.IDLivro,
    req.body.IDUsuario,
    req.body.DataEmprestimo,
    req.body.DataDevolucao,
    req.body.Status || 'pendente',
  ];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Empréstimo registrado com sucesso!' });
  });
};

export const updateEmprestimo = (req, res) => {
  const q = `
    UPDATE Emprestimos
    SET IDLivro = ?, IDUsuario = ?, DataEmprestimo = ?, DataDevolucao = ?, Status = ?
    WHERE ID = ?
  `;
  const values = [
    req.body.IDLivro,
    req.body.IDUsuario,
    req.body.DataEmprestimo,
    req.body.DataDevolucao,
    req.body.Status,
    req.params.id,
  ];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Empréstimo atualizado com sucesso!' });
  });
};

export const deleteEmprestimo = (req, res) => {
  db.query("DELETE FROM Emprestimos WHERE ID = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Empréstimo deletado com sucesso!' });
  });
};
