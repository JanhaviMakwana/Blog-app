const express = require('express');
const cors = require('cors');
const blogRoutes = require('./app/routes/blog');
const authRoutes = require('./app/routes/auth');
const db = require('./app/models');
const PORT = require('./app/config/app.config').appPort;

const app = express();

app.use(cors({
    'allowedHeaders': ['sessionId', 'Content-Type', 'Origin', 'Authorization'],
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

db.sequelize.sync({ force: false})
    .then(res => {
        server.listen(PORT);
    })
    .catch(err => console.log(err));


