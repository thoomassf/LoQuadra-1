var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'youremail@gmail.com', // endereço de email da loquadra
    pass: 'yourpassword' // senha do email
  }
});

var mailOptions = {
  from: 'youremail@gmail.com', // variável ou endereço com email da loquadra
  to: 'myfriend@yahoo.com', // variável com o email inserido no formulário
  subject: 'Fale Conosco - Loquadra',
  text: 'A gente agradece sua mensagem e em breve entra em contato, ok?',
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});