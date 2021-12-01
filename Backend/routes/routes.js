const { request } = require("express");
const {MongoClient, ObjectId, ConnectionCheckedInEvent, Collection} = require("mongodb");
const { fileURLToPath } = require("url");
const expressSession = require('express-session');
const bcrypt = require('bcryptjs');
const { Console } = require("console");


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
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    let user = {
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        password: hash,
        //password: req.body.password,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3 
    };
    const insertResult = await collection.insertOne(user);
    client.close();
    console.log(req.body.username + ' added');
    res.redirect('/login'); // change path to the login page's path
}
let lastVisited = '';
const date = `${new Date()}`;

//index reference
exports.index = async (req, res) => {
    await client.connect();
    const filteredDocs = await collection.findOne({_id: ObjectId(req.params.id)});
    client.close();
    
    lastVisited = req.cookies.lastVisited || date;
    res.cookie('lastVisited', date, {maxAge: 9999999999999999999999999999999999999});


    res.render('index', {
        title: 'Welcome',
        users: filteredDocs,
        cookie: lastVisited // req.cookies.lastVisited
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
    const compare = bcrypt.compareSync(req.body.password, filteredDocs.password, (err, res) => {});
    if (compare){
        req.session.user = { 
            isAuthenticated: true,
            username: req.body.username
        }
        res.redirect(`/index/${filteredDocs._id}`);
    }else {
        res.redirect('/login');
    }
}

exports.logout = (req,res) => {
    req.session.destroy(err => {
        if(err){
            console.log(err);
        }else {
            res.redirect('/login');
        }
    });
}

exports.edit = async  (req, res) => {
    await client.connect();
    const filterDocs = await collection.find(ObjectId(req.params.id)).toArray()
    client.close();
    res.render('edit', {
        title: 'Edit User',
        users: filterDocs[0]
    });
};

exports.editPerson = async (req,res) => {
    await client.connect();
    if(req.body.password == ""){
        const updateResult = await collection.updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: {
                username: req.body.username,
                email: req.body.email,
                age: req.body.age,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                answer3: req.body.answer3
            }}
        )
    }else{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const updateResult = await collection.updateOne(
            { _id: ObjectId(req.params.id) },
            { $set: {
                username: req.body.username,
                email: req.body.email,
                age: req.body.age,
                password: hash,
                answer1: req.body.answer1,
                answer2: req.body.answer2,
                answer3: req.body.answer3
            }}
        )
    }
    client.close();
    res.redirect(`/index/${req.params.id}`);
};