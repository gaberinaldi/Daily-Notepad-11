const express = require('express');
const path = require('path');
const fs = require('fs');
const { title } = require('process');
const { randomUUID } = require('crypto');
// const uuid = require('./helpers/uuid');

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
    console.log(req.body)
    fs.readFile('./db/db.json', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        const newNotes = {
            id:randomUUID(),
            title:req.body.title,
            text:req.body.text
        }

        var notesData = JSON.parse(data)
        console.log(notesData)

        notesData.push(newNotes);

        fs.writeFile('./db/db.json', JSON.stringify(notesData), (err, data) => {
            if (err) {
                console.error(err);
                return;
            }
    
            res.send(notesData)
        });
      });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT,() => {
console.log(`Running in port: http://localhost:${PORT}`)
});
