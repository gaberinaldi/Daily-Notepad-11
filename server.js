const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/assets/index.html'))
);

app.get('/api/db', (req, res) => {
    res.status(200).json(`${req.method} request recieved to get notes`);

console.info(`${req.method} request recieved to get notes`);
});