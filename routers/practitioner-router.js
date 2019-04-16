const practitionerRouter = require('express').Router();
const practitionerdb = require('../database/dbConfig.js');

practitionerRouter.get('/', (req, res) => {
    practitionerdb('practitionerInfo').then(practitioners => {
        res.status(200).json(practitioners);
    })
    .catch(error => {
        res.status(500).json({
            message: `The Practitioner could not be retrieved: ${error}`
        });
    });

    // res.send('Welcome practitioner set up your profile and see a list of your patients')
});

module.exports = practitionerRouter;