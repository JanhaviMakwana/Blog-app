const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const blogRoutes = require('./app/routes/blog'); 
const authRoutes = require('./app/routes/auth');
const { appPort } = require('./app/config/app.config');
const { dbUrl } = require('./app/config/database.config');

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Origin', 'authorization'],
    'credentials': true,
    'origin': 'http://localhost:3000',
    'methods': 'GET, HEAD, PUT,POST,DELETE'
}));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

app.use(blogRoutes); 
app.use(authRoutes);

app.use(express.static(__dirname + '/uploads'));


const server = require('http').createServer(app);

mongoose.Promise = global.Promise;

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log("MongoDB connection has been established!")
        server.listen(appPort);
    })
    .catch(err => {
        console.log("err");
        console.log(err);
    })


