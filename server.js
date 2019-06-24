const express = require('express');

const server = express();

const db = require('./data/accounts-model.js')

server.use(express.json())

server.post('/accounts', (req, res) => {
    const {name, budget} = req.body

    db.add({name, budget})
    .then(account => {
        res.json(account)
    })
    .catch(err => {
        res.status(500).json({err: 'An error occurred while saving the account to the database.'})
    })
});

server.get('/accounts', (req, res) => {
    
    db.find()
    .then(allAccounts => {
        res.json(allAccounts)
    })
    .catch(err => {
        res.status(500).json({err: 'The account information could not be retrieved.'})
    })
})

server.put('/accounts/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    db.update(id, changes)

    .then(updatedAccount => {
        updatedAccount ? 
        res.json(updatedAccount) :
        res.status(404).json({err: 'The account with that ID does not exist.'})
    })
    .catch(err => {
        res.status(500).json({err: 'The user info could not be retrieved.'})
    })
})

server.delete('/accounts/:id', async (req, res) => {
    const {id} = req.params

    db.remove(id)

    .then(deletedAccount => {
        deletedAccount ? 
        res.json(deletedAccount) :
        res.status(404).json({err: 'The account with that ID does not exist.'})
    })
    .catch(err => {
        res.status(500).json({err: 'The user info could not be deleted from the database.'})
    })
})

module.exports = server