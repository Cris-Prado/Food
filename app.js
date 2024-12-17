// Envia Dados Do Formulario Ao Banco De Dados

import sqlite3 from "sqlite3";
import { open } from "sqlite";

async function criarEPopularTabelaUsuarios(nome, sobrenome) {
  const db = await open({
    filename: "./src/banco/banco.db",
    driver: sqlite3.Database,
  });
  db.run(
    `CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY, nome TEXT, sobrenome TEXT)`
  );
  db.run(`INSERT INTO usuarios (nome, sobrenome) VALUES (?,?)`, [
    nome,
    sobrenome,
  ]);
}
criarEPopularTabelaUsuarios("Cristiano", "Prado");
