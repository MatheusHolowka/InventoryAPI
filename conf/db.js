// conf/db.js
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Substitua pelo seu usuário MySQL
  password: '123123', // Substitua pela sua senha MySQL
  database: 'biblioteca',
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message, err.stack);
    throw err;
  }
  console.log('Conectado ao banco de dados MySQL - Database: biblioteca');
});

export default db;