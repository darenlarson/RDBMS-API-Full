const express = require('express');
const knex = require('knex');
const knexConfig = require('./knexfile.js');
const server = express();

const db = knex(knexConfig.development);

server.use(express.json());

// cohort routes
server.get('/api/lambda/cohorts/:id', (req, res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .then(cohort => {
            if (cohort.length) {
                res.status(200).json(cohort);
            } else {
                res.status(404).json({ message: "The cohort ID is not valid." });
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.get('/api/lambda/cohorts', (req, res) => {
    db('cohorts')
        .then(cohorts => {
            res.status(200).json(cohorts);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

server.post('/api/lambda/cohorts', (req, res) => {
    let newCohort = req.body;

    db('cohorts')
        .insert(newCohort)
        .then(ids => {
            res.status(201).json(ids);
        })
        .catch(err => {
            if(!newCohort.name) {
                res.status(400).json({ message: "A valid name must be provided." });
            } else {
                res.status(500).json(err);
            };
        });
});

server.put('/api/lambda/cohorts/:id', (req, res) => {
    const changes = req.body;
    const updatedCohort = req.params.id

    db('cohorts')
        .where({ id: updatedCohort })
        .update(changes)
        .then(count => {
            if (count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: "The cohort ID is not valid." });
            };
        })
        .catch(err => {
            if (!changes.name) {
                res.status(400).json({ message: "A valid name must be provided. Please try again." });
            } else {
                res.status(500).json(err);
            };
        });
});

server.delete('/api/lambda/cohorts/:id', (req,res) => {
    db('cohorts')
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if(count) {
                res.status(200).json(count);
            } else {
                res.status(404).json({ message: "The cohort ID is not valid." });
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// student routes
server.get('/api/lambda/cohorts/:id/students', (req, res) => {
    const cohortId = req.params.id;

    db('students')
        .where({ cohort_id: cohortId})
        .then(student => {
            if(student.length) {
                res.status(200).json(student);
            } else {
                res.status(404).json({ message: "The cohort ID is not valid." });
            };
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

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