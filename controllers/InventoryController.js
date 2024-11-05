import db from "../conf/db.js";

/* CRUD - INVENTORY CONTROLLER */
const addInventoryItem = (req, res) => {
  // Get all clients
  let query = "SELECT * FROM inventory";

  if (req.query.search) {
    const search = req.query.search;
    query += ` WHERE name LIKE '%${search}%' OR description LIKE '%${search}%' OR quantity LIKE '%${search}%' OR price LIKE '%${search}%'`;
  }

  if (req.query.sortKey && req.query.sortOrder) {
    const orderKey = req.query.sortKey;
    const orderValue = req.query.sortOrder;
    query += " ORDER BY " + orderKey + " " + orderValue;
  } else {
    query += " ORDER BY name asc";
  }
  const page = req.query.page;
  const limit = req.query.limit;
  const offset = (page - 1) * limit;
  query += " LIMIT " + limit + " OFFSET " + offset;

  db.query(query, (err, result) => {
    if (err) res.status(500);
    db.query("SELECT COUNT(*) AS total FROM inventory", (err, count) => {
      if (err) res.status(500);
      res.json({ data: result, total: count[0].total });
    });
  });
};

const getInventoryItems = (req, res) => {
  // Obtém todos os itens do estoque
  let query = "SELECT * FROM inventory";

  if (req.query.search) {
    const search = req.query.search;
    query += ` WHERE name LIKE '%${search}%' OR description LIKE '%${search}%'`;
  }

  if (req.query.sortKey && req.query.sortOrder) {
    const orderKey = req.query.sortKey;
    const orderValue = req.query.sortOrder;
    query += ` ORDER BY ${orderKey} ${orderValue}`;
  } else {
    query += " ORDER BY name ASC";
  }

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  query += ` LIMIT ${limit} OFFSET ${offset}`;

  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao obter os itens" });
    }
    db.query("SELECT COUNT(*) AS total FROM inventory", (err, count) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Erro ao obter o total de itens" });
      }
      res.json({ data: result, total: count[0].total });
    });
  });
};

const updateInventoryItem = (req, res) => {
  // Atualiza um item no estoque
  const id = req.params.id;
  const item = req.body;
  const query = `UPDATE inventory SET name = '${item.name}', description = '${item.description}', quantity = ${item.quantity}, price = ${item.price} WHERE uuid = '${id}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar o item" });
    }
    res.json(result);
  });
};

const deleteInventoryItem = (req, res) => {
  // Deleta um item do estoque
  const id = req.params.id;
  const query = `DELETE FROM inventory WHERE uuid = '${id}'`;
  db.query(query, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao deletar o item" });
    }
    res.json(result);
  });
};

export default {
  addInventoryItem,
  getInventoryItems,
  updateInventoryItem,
  deleteInventoryItem,
};
