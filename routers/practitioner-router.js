const practitionerRouter = require('express').Router();
const practitionerdb = require('../database/dbConfig.js');

// practitionerRouter.get('/', (req, res) => {
//     practitionerdb('practitionerInfo').then(practitioners => {
//         res.status(200).json(practitioners);
//     })
//     .catch(error => {
//         res.status(500).json({
//             message: `The Practitioner could not be retrieved: ${error}`
//         });
//     });

//     // res.send('Welcome practitioner set up your profile and see a list of your practitioners')
// });

const Practioners = require('../helpers/practitionerModel.js');

practitionerRouter.get('/', async (req, res) => {
    try {
        const practitioners = await Practioners.find();
        if(practitioners.length) {
            res.status(200).json({
                error: false,
                message: 'The practitioners were found in the database',
                practitioners
            });
        } else {
            res.status(404).json({
                error: true,
                practitioners: [],
                message: 'The practitioners could not be found.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            practitioners: [],
            message: `There was an error processing your request: ${error}`
        });
    }
});

practitionerRouter.get('/:id', async (req, res) => {
    try {
        const patient = await Practioners.findById(req.params.id);
        if(patient) {
            res.status(200).json({
                error: false,
                message: 'The patient was found in the database',
                patient
            });
        } else {
            res.status(404).json({
                error: true,
                patient: {},
                message: 'The patient could not be found in the database'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            patient: {},
            message: `There was an error processing your request: ${error}`
        });
    }
});

// Find all practitioners with corresponding vaccines route
practitionerRouter.get('/practitioners-vaccines/:id', async (req, res) => {
    try {
        const practitioners = await Practioners.findAllpractitionersAndVaccines(req.params.id);
        if(practitioners.length) {
            res.status(200).json({
                error: false,
                message: 'Your family members and vaccines were found successfully',
                practitioners
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Your family members and vaccines could not be found',
                practitioners: []
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            practitioners: [],
            message: `There was an error processing your request: ${error}`
        });
    }
});

// Create new Patient
practitionerRouter.post('/', async (req, res) => {
    const { patientUserId, firstName, lastName } = req.body;
    if(!patientUserId || !firstName || !lastName ) {
        res.status(406).json({
            error: true,
            patient: {},
            message: 'Please include all required fields and try again'
        });
    } else {
        try {
            const newPatient = req.body;
            Practioners.insert(newPatient).then(patient => {
                res.status(201).json(patient);
            });        
        } catch (error) {
            res.status(500).json({
                error: `There was an error while saving the patient to the database`
            });
        }
    }
   
});

practitionerRouter.put('/:id', async (req, res) => {
    try {
        const patient = await Practioners.update(req.params.id, req.body);
        if(patient) {
            const updatedPatient = await Practioners.findById(req.params.id);
            res.status(200).json({
                error: false,
                message: 'The patient was updated in the database',
                patient: updatedPatient
            });
        } else {
            res.status(404).json({
                error: true,
                patient: {},
                message: 'The patient could not be updated in teh database.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            practitioners: {},
            message: `There was an error processing your request: ${error}`
        });
    }
});

practitionerRouter.delete('/:id', async (req, res) => {
    try {
        const patient = await Practioners.remove(req.params.id);
        if(patient) {
            res.status(200).json({
                error: false,
                message: 'The patient was deleted from the database'
            });
        } else {
            res.status(404).json({
                error: true,
                patient: {},
                message: `The patient could not be deleted in the database`
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            patient: {},
            message: 'There was an error processing your request'
        });
    }
});

module.exports = practitionerRouter;