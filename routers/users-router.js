const usersRouter = require('express').Router();

const userdb = require('../database/dbConfig.js');

usersRouter.get('/', (req, res) => {
    userdb('users').then(users => {
        res.status(200).json(users);
    }).catch(error => {
        res.status(500).json({
            message: `The user could not be retrieved: ${error}`
        });
    });
    // res.send('list of registered and logged in users');
});

module.exports = usersRouter;