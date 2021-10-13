// Importa os pacotes
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

// Inicia o express
const server = express();

// Utiliza body do req
server.use(express.urlencoded({ extended: true }));

// Utiliza os arquivos estáticos
server.use(express.static('public'));

// Configuração template engine
server.set('views', path.join(__dirname, 'views'));
server.set('view engine', 'hbs');

// Rotas
server.get('/', pages.index);
server.get('/quadra', pages.quadra);
server.get('/quadras', pages.quadras);
server.get('/create-quadra', pages.createquadra);
server.post('/save-quadra', pages.savequadra);
server.post('/save-quadra', pages.savequadra);
server.post('/delete_quadra', pages.delete_quadra);
server.post('/modal', pages.modal);
server.post('/save-user', pages.saveUser);
server.post('/email', pages.email);
// Rotas para autenticação
server.get('/login', pages.login);
server.post('/loginUser', pages.loginUser);
server.get('/cadastrate', pages.cadastrate);
server.get('/forgot-login', pages.forgotLogin);
server.get('/contact-us', pages.contactUs);
// Rotas para o Dashboard
server.get('/dashboard', pages.dashboard);

// Inicia o servidor
server.listen(5500);