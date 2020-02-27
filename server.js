const express = require('express');
const AccountRouter = require('./routers/accountRouter.js');
const server = express();

server.use(express.json());
server.use('/api/accounts', AccountRouter);

server.use((error, req, res, next) => {
    console.log(error)
    res.status(500).json({ message: "Something went wrong", })
})

server.get('/', (req, res) => {
    res.send('<h3>node-db1-project</h3>');
});

module.exports = server;