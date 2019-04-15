const practitionerRouter = require('express').Router();

practitionerRouter.get('/', (req, res) => {
    res.send('Welcome practitioner set up your profile and see a list of your patients')
});

module.exports = practitionerRouter;