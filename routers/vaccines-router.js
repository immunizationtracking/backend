const vaccineRouter = require('express').Router();

vaccineRouter.get('/', (req, res) => {
    res.send('See a list of vaccines');
});

module.exports = vaccineRouter;