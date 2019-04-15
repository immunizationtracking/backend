const patientRouter = require('express').Router();

patientRouter.get('/', (req, res) => {
    res.send('Welcome to your patient profile')
})

module.exports = patientRouter;