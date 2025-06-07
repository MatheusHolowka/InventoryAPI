import db from '../conf/db.js'; // conexão com o banco

export const getUsuarios = (req, res) => {
  const q = "SELECT * FROM Usuarios";
  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data);
  });
};

export const getUsuarioById = (req, res) => {
  const q = "SELECT * FROM Usuarios WHERE ID = ?";
  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    res.json(data[0]);
  });
};

export const createUsuario = (req, res) => {
  const q = "INSERT INTO Usuarios (Nome, Email, CPF, Telefone) VALUES (?, ?, ?, ?)";
  const values = [req.body.Nome, req.body.Email, req.body.CPF, req.body.Telefone];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário criado com sucesso!' });
  });
};

export const updateUsuario = (req, res) => {
  const q = "UPDATE Usuarios SET Nome = ?, Email = ?, CPF = ?, Telefone = ? WHERE ID = ?";
  const values = [req.body.Nome, req.body.Email, req.body.CPF, req.body.Telefone, req.params.id];
  db.query(q, values, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário atualizado com sucesso!' });
  });
};

export const deleteUsuario = (req, res) => {
  const q = "DELETE FROM Usuarios WHERE ID = ?";
  db.query(q, [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Usuário deletado com sucesso!' });
  });
};
export default { getUsuarios, getUsuarioById, createUsuario, updateUsuario, deleteUsuario };