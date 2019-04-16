const vaccineRouter = require('express').Router();
const vaccinesdb = require('../database/dbConfig.js');

vaccineRouter.get('/', (req, res) => {
    vaccinesdb('vaccines').then(vaccines => {
        res.status(200).json(vaccines);
    })
    .catch(error => {
        res.status(500).json({
            message: `The vaccine could not be retrieved: ${error}`
        });
    });
    // res.send('See a list of vaccines');
});

module.exports = vaccineRouter;