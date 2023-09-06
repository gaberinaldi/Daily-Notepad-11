const express = require('express');
const path = require('path');
const fs = require('fs');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);

        var notesData = JSON.parse(data)
        console.log(notesData)

        res.send(notesData)
      });
});
app.post('/api/notes', (req, res) => {
    fs.writeFile('./db/db.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(data);

        res.send(notesData)
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT,() => {
console.log(`Running in port: http://localhost:${PORT}`)
});



// console.info(`${req.method} request recieved to get notes`);
// });