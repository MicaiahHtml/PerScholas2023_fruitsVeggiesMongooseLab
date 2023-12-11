require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
// const fruits = require('./models/fruits.js');
//we now want to import the fruit model.
const Fruit = require("./models/fruits/fruit");
const Vegetable = require("./models/vegetables/vegetable");
const jsxViewEngine = require('jsx-view-engine');

// Global Configuration
const mongoURI = process.env.MONGO_URI;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {console.log("Connected to Mongo")});


app.set('view engine', 'jsx');
app.set('views', './views');
app.engine('jsx', jsxViewEngine());

// ================ Middleware ================
//
app.use((req, res, next) => {
    console.log('Middleware: I run for all routes');
    next();
})

//near the top, around other app.use() calls
app.use(express.urlencoded({extended:false}));

// These are my routes
// We are going to create the 7 RESTful routes
// There is an order for them to listed in the code
// I - N - D - U - C - E - S
//  Action      HTTP Verb   CRUD 
// I - Index    GET         READ - display a list of elements
// N - New      GET         CREATE * - but this allows user input
// D - Delete   DELETE      DELETE
// U - Update   PUT         UPDATE * - this updates our database
// C - Create   POST        CREATE * - this adds to our database
// E - Edit     GET         UPDATE * - but this allows user input
// S - Show     GET         READ - display a specific element

app.get('/', (req, res) => {
    res.send('this is my fruits root route');
});

// I - INDEX - dsiplays a list of all fruits
app.get('/fruits/', async (req, res) => {
    // res.send(fruits);
    try{
        const foundFruits = await Fruit.find({});
        res.status(200).render('fruits/Index', {fruits: foundFruits});
    }catch(err){
        res.status(400).send(err);
    }
    
});
app.get('/vegetables/', async (req, res) => {
    // res.send(fruits);
    try{
        const foundVegetables = await Vegetable.find({});
        res.status(200).render('vegetables/Index', {vegetables: foundVegetables});
    }catch(err){
        res.status(400).send(err);
    }
    
});

// N - NEW - allows a user to input a new fruit
app.get('/fruits/new', (req, res) => {
    res.render('fruits/New');
});

app.get('/vegetables/new', (req, res) => {
    res.render('vegetables/New');
});


// C - CREATE - update our data store
app.post('/fruits', async (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }

    try{
        const createdFruit = await Fruit.create(req.body);
        //STATUS 200 = SUCCESS
        res.status(200).redirect('/fruits');
    }catch (err){
        res.status(400).send(err);
    }
});

// C - CREATE - update our data store
app.post('/vegetables', async (req, res) => {
    if(req.body.readyToEat === 'on') { //if checked, req.body.readyToEat is set to 'on'
        req.body.readyToEat = true;
    } else {  //if not checked, req.body.readyToEat is undefined
        req.body.readyToEat = false;
    }

    try{
        const createdVegetable = await Vegetable.create(req.body);
        //STATUS 200 = SUCCESS
        res.status(200).redirect('/vegetables');
    }catch (err){
        res.status(400).send(err);
    }
});


// S - SHOW - show route displays details of an individual fruit
app.get('/fruits/:id', async (req, res) => {
    try{
        const foundFruit = await Fruit.findById(req.params.id);
        res.render('fruits/Show', {fruit: foundFruit});
    }catch (err){
        res.status(400).send(err);
    }
})

app.get('/vegetables/:id', async (req, res) => {
    try{
        const foundVegetable = await Vegetable.findById(req.params.id);
        res.render('Show', {vegetable: foundVegetable});
    }catch (err){
        res.status(400).send(err);
    }
})

app.listen(3000, () => {
    console.log('listening');
});