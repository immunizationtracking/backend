const usersRouter = require('express').Router();

usersRouter.get('/', (req, res) => {
    res.send('list of registered and logged in users');
});

module.exports = usersRouter;