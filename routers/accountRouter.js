const express = require('express');

const db = require('../data/dbConfig.js');

const router = express.Router();

// get all accounts
router.get('/', async (req, res, next) => {
    try {
        res.json(await db.select("*").from("accounts"))
    } catch (error) {
        next(error)
    }
});

// get account by id
router.get('/:id', async (req, res, next) => {
    try {
        const account = await db.first("*").from("accounts").where("id", req.params.id)
        res.json(account)
    } catch (error) {
        next(error)
    }
});

// create an account 
router.post('/', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        const [id] = await db("accounts").insert(payload)
        const newAccount = await db("accounts").where("id", id).first()
        res.json(newAccount)
    } catch (error) {
        next(error)
    }
});

// update an acount
router.put('/:id', async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget,
        }
        await db("accounts").where("id", req.params.id).update(payload)
        const account = await db("accounts").where("id", res.params.id).first()
        res.json(account)
    } catch (error) {
        next(error)
    }
})

// delete an account 
router.delete('/:id', async (req, res, next) => {
    try {
        await db("accounts").where("id", req.params.id).del()
        res.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = router;