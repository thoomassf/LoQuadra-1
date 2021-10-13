// Importa o pacote
const Database = require('sqlite-async');

function execute(db) {
    return db.exec(`
        CREATE TABLE IF NOT EXISTS quadras (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            lat TEXT,
            lng TEXT,
            name TEXT,
            type_block TEXT,
            about TEXT,
            images TEXT,
            cep TEXT,
            street TEXT,
            number INT,
            district TEXT,
            city TEXT,
            state TEXT,
            whatsapp TEXT,
            telephone TEXT,
            email TEXT,
            opening_hours TEXT,
            price_hour TEXT,
            open_on_weekends TEXT
        );

        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT,
            email TEXT,
            password TEXT,
            celular TEXT,
            documento TEXT
        );
    `);
}

module.exports = Database.open(__dirname + '/database.sqlite').then(execute);