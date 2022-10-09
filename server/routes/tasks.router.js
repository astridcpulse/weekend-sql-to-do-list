const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();

// POST endpoint
taskRouter.post('/', (req, res)=> {
    let queryText = `
        INSERT INTO "tasks"
            ("name", "notes", "urgency", "complete")
        VALUES 
            ($1, $2, $3, $4);
        `;
    let sqlParams = [
        req.body.name,
        req.body.notes, 
        req.body.urge, 
        req.body.comp
        ];
        
        console.log('sqlParams', sqlParams)

    pool.query(queryText, sqlParams)
        .then((response) => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(`error sending new task`, err);
            res.sendStatus(500);
    });
});
// PUT endpoint
taskRouter.put('/:id', (req, res) => {
    taskId = req.params.id;
    console.log('taskID', taskId);

    pool.query(`
        SELECT * FROM "tasks" ORDER BY "id";
    `).then((dbRes) =>{
        res.send(dbRes.rows);
    }).catch((err) => {
        console.log('PUT tasks failed', err);
        res.sendStatus(500);
    });
});


// GET endpoint
taskRouter.get('/', (req, res) => {
    pool.query(`
        SELECT * FROM "tasks" ORDER BY "id";
    `).then((dbRes) =>{
        res.send(dbRes.rows);
    }).catch((err) => {
        console.log('GET tasks failed', err);
        res.sendStatus(500);
    });
});

module.exports = taskRouter;