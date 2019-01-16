const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const server = express();

const db = knex(knexConfig.development);

server.use(express.json());

// cohort routes
server.get('/api/lambda/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// student routes
server.get('/api/lambda/students', (req, res) => {
    db('students')
        .then(students => {
            res.status(200).json(students);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});



let port = 5000;
server.listen(port, () => console.log(`server running on port: ${port}`));