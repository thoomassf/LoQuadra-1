function saveUser(db, quadra) {
  return db.run(`
    INSERT INTO users (
      nome,
      email,
      password,
      celular,
      documento
    ) VALUES (
      "${quadra.nome}",
      "${quadra.email}",
      "${quadra.password}",
      "${quadra.celular}",
      "${quadra.documento}"
    );
  `);
}

module.exports = saveUser;