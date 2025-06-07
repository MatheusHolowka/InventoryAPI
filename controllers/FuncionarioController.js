import db from '../db.js';

export const getFuncionarios = (req, res) => {
  db.query("SELECT * FROM Funcionarios", (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

export const getFuncionarioById = (req, res) => {
  db.query("SELECT * FROM Funcionarios WHERE ID = ?", [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

export const createFuncionario = (req, res) => {
  const q = "INSERT INTO Funcionarios (Nome, Cargo, Login, Senha) VALUES (?, ?, ?, ?)";
  const values = [req.body.Nome, req.body.Cargo, req.body.Login, req.body.Senha];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Funcionário criado com sucesso!' });
  });
};

export const updateFuncionario = (req, res) => {
  const q = "UPDATE Funcionarios SET Nome = ?, Cargo = ?, Login = ?, Senha = ? WHERE ID = ?";
  const values = [req.body.Nome, req.body.Cargo, req.body.Login, req.body.Senha, req.params.id];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Funcionário atualizado com sucesso!' });
  });
};

export const deleteFuncionario = (req, res) => {
  db.query("DELETE FROM Funcionarios WHERE ID = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Funcionário deletado com sucesso!' });
  });
};
