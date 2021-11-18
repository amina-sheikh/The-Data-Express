const { request } = require("express");
const {MongoClient, ObjectId, ConnectionCheckedInEvent, Collection} = require("mongodb");


const url = 'mongodb+srv://brosephina:Password123@cluster0.og3yx.mongodb.net/myData?retryWrites=true&w=majority';
const client = new MongoClient(url);

const dbName = 'myData';
const db = client.db(dbName);
const collection = db.collection('Users');

// Creates the create user page
exports.create = (req, res) => {
    res.render('create', {
        title: 'Add Person'
    });
};

// Stores the data from the create user page
exports.createUser = async (req, res) => {
    await client.connect();
    let person = {
        username: req.body.username,
        email: req.body.email,
        age: req.body.age,
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3 
    };
    const insertResult = await collection.insertOne(person);
    client.close();
    console.log(req.body.name + ' added');
    res.redirect('/'); // change path to the login page's path
}