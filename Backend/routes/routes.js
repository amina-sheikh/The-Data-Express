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
        title: ''
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
        answer1: req.body.answer1,
        answer2: req.body.answer2,
        answer3: req.body.answer3,
        accessType: "user"
    };
    const insertResult = await collection.insertOne(user);
    client.close();
    console.log(req.body.username + ' added');
    res.redirect('/login'); 
}

let lastVisited = '';
const date = `${new Date()}`;

//index reference
exports.index = async (req, res) => {
    await client.connect();
    const filteredDocs = await collection.findOne({_id: ObjectId(req.params.id)});
    client.close();
    // Used to display then update the cookie storing lastVisited
    lastVisited = req.cookies.lastVisited || date;
    res.cookie('lastVisited', date, {maxAge: 9999999999999999999999999999999999999});

    // Used to hide/show the link that leads to /admin
    let admin = '';
    if(access=='admin'){admin = 'List of users'}
    else{}

    res.render('index', {
        title: 'Welcome',
        users: filteredDocs,
        cookie: lastVisited,
        access: admin
    });
};


//Loads the login page
exports.login = (req, res) => {
    res.render('login', {
        title: ''
    });
};

// Used to swap paths related to access level
let access = '';

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
        
        // Determines if login is for user or admin
        if(filteredDocs.accessType=='admin')
        { access = 'admin'; }
        else
        { access = 'user';  }
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

exports.editA = async  (req, res) => {
    await client.connect();
    const filterDocs = await collection.find(ObjectId(req.params.id)).toArray()
    client.close();
    res.render('editAdmin', {
        title: 'Edit Yourself',
        users: filterDocs[0]
    });
};

exports.api = async (req,res) => {
    await client.connect();
    myjson = await collection.find({}).toArray();
    client.close()
    let catanswer = 0;
    let doganswer = 0;
    let snakeanswer = 0;
    let fishanswer = 0;
    let busanswer = 0;
    let traxanswer = 0;
    let caranswer = 0;
    let bikeanswer = 0;
    let chipsanswer = 0;
    let candyanswer = 0;
    let crackersanswer = 0;
    let cookiesanswer = 0;
    for(let i=0; i < myjson.length; i++){
        switch(myjson[i].answer1){
            case "Cat":
                catanswer++;
                break;
            case "Dog":
                doganswer++;
                break;
            case "Snake":
                snakeanswer++;
                break;
            case "Fish":
                fishanswer++;
                break;
        }
        switch(myjson[i].answer2){
            case "Bus":
                busanswer++;
                break;
            case "Trax":
                traxanswer++;
                break;
            case "Car":
                caranswer++;
                break;
            case "Bike":
                bikeanswer++;
                break;
        }
        switch(myjson[i].answer3){
            case "Chips":
                chipsanswer++;
                break;
            case "Candy":
                candyanswer++;
                break;
            case "Crackers":
                crackersanswer++;
                break;
            case "Cookies":
                cookiesanswer++;
                break;
        }
    }
    res.json({
        "What is your favorite pet?" : 
        {
            Cat : catanswer,
            Dog : doganswer,
            Snake : snakeanswer,
            Fish : fishanswer,
        },
        "How do you get to school?" :
        {
            Bus : busanswer,
            Trax : traxanswer,
            Car : caranswer,
            Bike : bikeanswer,
        },
        "What is your favorite snack?" :
        {
            Chips: chipsanswer,
            Candy : candyanswer,
            Crackers : crackersanswer,
            Cookies : cookiesanswer,
        }
    });
}

// Used to refresh the page when deleting or making admins
let adminID = "";

// Admin page -- Loads the pug page
exports.admin = async (req, res) => {
    await client.connect();
    const filteredDocs = await collection.findOne({_id: ObjectId(req.params.id)});
    const findResult = await collection.find({}).toArray();
    console.log("Found documents => ", findResult);
    client.close();
    adminID = req.params.id;

    lastVisited = req.cookies.lastVisited || date;
    res.cookie('lastVisited', date, {maxAge: 9999999999999999999999999999999999999});

    res.render('admin', {
        title: 'Users',
        database: findResult,
        users: filteredDocs,
        cookie: lastVisited
    });
};


// Delete method -- COMPLETE 
exports.delete = async (req, res) => {
    await client.connect();
    const deleteResult = await collection.deleteOne({_id: ObjectId(req.params.id)});
    client.close();
    // updates list
    res.redirect(`/admin/${adminID}`);

};

// Makes users admins
exports.addAdmin = async (req, res) => {
await client.connect();
    const updateResult = await collection.updateOne(
        { _id: ObjectId(req.params.id) },
        { $set: {
            accessType: "admin"
        }}
    )
    client.close();
    // updates list
    res.redirect(`/admin/${adminID}`);
};