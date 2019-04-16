const patientRouter = require('express').Router();

// const patientdb = require('../database/dbConfig.js');
const patientdb = require('../database/dbConfig.js');

patientRouter.get('/', (req, res) => {
    patientdb('patientInfo').then(patients => {        
        res.status(200).json(patients);
    })
    .catch(error => {
        res.status(500).json({
            message: `The patient info could not be retrieved: ${error}`
        });
    });
    // res.send('Welcome to your patient profile')
});

module.exports = patientRouter;