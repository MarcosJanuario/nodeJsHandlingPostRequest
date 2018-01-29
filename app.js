var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.set('view engine', 'ejs');

// middleware to make the css works for ejs files. primeiro parametro pega identifica o url requisitada
// e o segundo parametro mostra qual folder sera requisitado ao ter a url requisitada
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
    // with express it is not necessary tospecify the content type. Express is clever enought to figure this out
    // diferentemente de .SEND, .SENDFILE joga HMTML no browser e nao plain text
    // res.sendFile(__dirname + '/index.html');
    // mostra o conteudo de views/index.ejs ao invez de simples index.html
    res.render('index');
});

app.get('/contact', (req, res) => {
    // Nao é necessario especificar o contentType com express. ELe é esperto o bastante pra diferenciar o .SEND de .SENDFILE, jogando o mesmo no browser
    // como HTML e nao text/plain
    // res.sendFile(__dirname + '/contact.html');
    // mostra o conteudo de views/contact.ejs ao invez de simples contact.html

    // o req.QUERY do express, contem toda a query string que é passada na url
    res.render('contact', {qs: req.query});
});

app.post('/contact', urlencodedParser, (req, res) => {
    console.log(req.body);
    res.render('contact-success', {data: req.body});
});

app.get('/profile/:name', (req, res) => {
    var data = {age: 30, job: 'ninja', hobbies: ['eating', 'drinking', 'playing']};
    // res.render('profile', {person: req.params.name, data: data});
    res.render('profile', {person: req.params.name, data: data});
});

app.listen(3000);