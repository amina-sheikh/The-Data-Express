const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes.js');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '\\views');
app.use(express.static(path.join(__dirname, '/public')));

const urlencodedParser = express.urlencoded({
    extended: false
});

// URLS
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/index/:id', routes.index);
//app.get('/edit/:id', routes.edit);
//app.post('/edit/:id', urlencodedParser, routes.editPerson);
//app.get('/delete/:id', routes.delete);
//app.get('/details/:id', routes.details);

app.listen(3000);