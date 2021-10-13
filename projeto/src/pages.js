// Importa os pacotes
const Database = require('./database/db');
const savequadra = require('./database/savequadra');
const saveUser = require('./database/saveUser');


const nodemailer = require('nodemailer');


module.exports = {
    index(req, res) {
        return res.render('index');
    },

    
    async quadra(req, res) {
        const id = req.query.id;

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM quadras WHERE id = "${id}"`);
            const quadra = results[0];

            quadra.images = quadra.images.split(',');
            quadra.firstImage = quadra.images[0];

            if (quadra.open_on_weekends == '0') {
                quadra.open_on_weekends = false;
            } else {
                quadra.open_on_weekends = true;
            }

            return res.render('quadra', { quadra });
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados.');
        }
    },
   
    async quadras(req, res) {
        try {
            const db = await Database;
            const quadras = await db.all('SELECT * FROM quadras');
            return res.render('quadras', { quadras });
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados.');
        }
    },
    createquadra(req, res) {
        return res.render('create-quadra');
    },
    async savequadra(req, res) {
        const fields = req.body;

        // Validar se todos os campos estão preenchidos
        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos.');
        }

        // Salva o cadastro
        try {
            const db = await Database;

            await savequadra(db, {
                lat: fields.lat,
                lng: fields.lng,
                name: fields.name,
                type_block: fields.type_block,
                about: fields.about,
                images: fields.images.toString(),
                cep: fields.cep,
                street: fields.street,
                number: fields.number,
                district: fields.district,
                email: fields.email,
                city: fields.city,
                state: fields.state,
                whatsapp: fields.whatsapp,
                telephone: fields.telephone,
                opening_hours: fields.opening_hours,
                price_hour: fields.price_hour,
                open_on_weekends: fields.open_on_weekends
            });

            // Redirecionamento
            return res.redirect('/quadras');
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados.');
        }
    },
    login(req, res) {
        return res.render('restrict-login');
    },    
    async loginUser(req, res) {
        console.log(req.body.email);
        const id = req.body.email;

        try {
            const db = await Database;
            const results = await db.all(`SELECT * FROM users WHERE email = "${id}"`);
            const quadra = results[0];

            if (quadra.password == req.body.password) {
                return res.redirect('/quadras');
            } else {
                console.log(error);
                return alert('Erro ao consultar no banco de dados.');
            }

        } catch (error) {
            console.log(error);
            return res.send('Login ou Senha inválidos.');
        }
    },
    cadastrate(req, res) {
        return res.render('cadastrate');
    },
    async saveUser(req, res) {
        const fields = req.body;

        if (Object.values(fields).includes('')) {
            return res.send('Todos os campos devem ser preenchidos.');
        }

        try {
            const db = await Database;

            await saveUser(db, {
                nome: fields.nome,
                email: fields.email,
                password: fields.password,
                celular: fields.celular,
                documento: fields.documento,
            });
            // Redirecionamento
            return res.redirect('/quadras');
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados');
        }
    },
    forgotLogin(req, res) {
        return res.render('forgot-login');
    },
    contactUs(req, res) {
        return res.render('contact-us');
    },
    async dashboard(req, res) {
        try {
            const db = await Database;
            const quadras = await db.all('SELECT * FROM quadras');
            const total = await db.all('SELECT COUNT(*) FROM quadras');
            return res.render('registred-dashboard', { quadras });
            
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados.');
        }
    },
    async delete_quadra(req, res) {
        const fields= req.body;
        console.log(fields.id);
        try {
            const db = await Database;
            await db.all(`DELETE FROM quadras WHERE id = "${fields.id}"`);
            const quadras = await db.all('SELECT * FROM quadras');
            const total = await db.all('SELECT COUNT(*) FROM quadras');
            return res.render('registred-dashboard', { quadras });
        } catch (error) {
            console.log(error);
            return res.send('Erro no banco de dados.');
        }
    },
    // define your own email api which points to your server.
    
    async email (req, res){
                
        let _name = req.body.name;
        let _email = req.body.email;
        let _subject = "Informação de Contato";
        let _message = req.body.message;
        var remetente = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            service: 'Gmail',
            port: 587,
            secure: true,
            auth:{
            user: 'loquadrasenac@gmail.com',
            pass: 'LoQuadra2021' }
            });

            var emailASerEnviado = {
                from: _email,
                to: 'loquadrasenac@gmail.com',
                subject: 'Contato Loquadra',
                text: req.body.email+'   /'+_name+'   :'+_message,
                };
                remetente.sendMail(emailASerEnviado, function(error){
                    if (error) {
                    console.log(error);
                    } else {
                    console.log('Email enviado com sucesso.');
                    // Redirecionamento
                    return res.redirect('/quadras');
                    }
                    });
    },
    async modal (req, res){
                
        let _password= req.body.password;
     
        if (_password == 'admin123') {
            // Redirecionamento
            return res.redirect('/create-quadra');
        } else {
            return res.send('Senha inválida!');
            
         }
    
    }
};