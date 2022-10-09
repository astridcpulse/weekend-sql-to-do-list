const express = require('express');
const pool = require('../modules/pool');
const taskRouter = express.Router();

// POST endpoint
taskRouter.post('/', (req, res)=> {
    const sqlText = `
        INSERT INTO "tasks"
            ("name", "notes", "urgency", "complete")
        VALUES 
            ($1, $2, $3, $4);
        `;
    const sqlParams = [
        req.body.name,
        req.body.notes, 
        req.body.urge, 
        req.body.comp
        ];
        
        console.log('sqlParams', sqlParams)

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((err) => {
            console.log(`error sending new task`, err);
            res.sendStatus(500);
    });
});

// PUT endpoint
taskRouter.put('/:id', (req, res) => {
    const taskId = req.params.id;
    console.log('taskID', taskId);

    const sqlText = `UPDATE "tasks"
                SET "complete" = NOT "complete"
                WHERE "id" = $1;
            `;
    const sqlParams = [taskId];

    pool.query(sqlText, sqlParams)
    .then((dbRes) =>{
        res.sendStatus(203);
    }).catch((err) => {
        console.log('PUT update failed', err);
        res.sendStatus(500);
    });
});

// DELETE ENDPOINT
taskRouter.delete('/:id', (req, res) =>{
    const taskId = req.params.id;
    const sqlText = 'DELETE FROM "tasks" WHERE "id" = $1'
    const sqlParams = [taskId];

    pool.query(sqlText, sqlParams)
        .then((dbRes) => {
            res.sendStatus(200);
        }).catch((err) => {
            console.log('delete koala failed', err);
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