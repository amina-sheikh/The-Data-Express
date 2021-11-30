const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes.js');
    cookieParser = require('cookie-parser')
    expressSession = require('express-session');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '\\views');
app.use(express.static(path.join(__dirname, '/views')));

app.use(cookieParser());

app.use(expressSession({
    secret: "OurS3crEt!",
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({
    extended: false
});

const checkAuth = (req, res, next) => {
    if(req.session.user && req.session.user.isAuthenticated){
        next();
    }else {
        res.redirect('/login');
    } 
};

// URLS
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createUser);
app.get('/index/:id',checkAuth, routes.index);
app.get('/login',routes.login);
app.post('/login', urlencodedParser, routes.loginUser)
app.get('/logout', routes.logout); 
app.get('/edit/:id', routes.edit);
app.post('/edit/:id', urlencodedParser, routes.editPerson);
//app.get('/delete/:id', routes.delete);
//app.get('/details/:id', routes.details);

app.listen(3000);