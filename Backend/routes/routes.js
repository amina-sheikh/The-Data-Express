const { request } = require("express");
const {MongoClient, ObjectId, ConnectionCheckedInEvent, Collection} = require("mongodb");
const { fileURLToPath } = require("url");


const url = 'mongodb+srv://brosephina:Password123@cluster0.og3yx.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'myData';
const db = client.db(dbName);
const collection = db.collection('Users');

// Creates the create user page
exports.create = (req, res) => {
    res.render('create', {
        title: 'Add User'
    });
};

// Stores the data from the create user page
exports.createUser = async (req, res) => {
    await client.connect();
    let user = {
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        password: req.body.password,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3 
    };
    const insertResult = await collection.insertOne(user);
    client.close();
    console.log(req.body.username + ' added');
    res.redirect('/login'); // change path to the login page's path
}

//index reference
exports.index = async (req, res) => {
    await client.connect();
    const filteredDocs = await collection.findOne({_id: ObjectId(req.params.id)});
    client.close();
    res.render('index', {
        title: 'Welcome',
        users: filteredDocs
    });
};

//Loads the login page
exports.login = (req, res) => {
    res.render('login', {
        title: 'Log In'
    });
};

//Gets data from login page and checks if it's in the database
    //Then, it logs the user in if it is
exports.loginUser = async (req,res) => {
    await client.connect();
    const filteredDocs = await collection.findOne({username: req.body.username})
    client.close();
    if (filteredDocs.password == req.body.password)
        res.send(`You are succefully logged in`)
}