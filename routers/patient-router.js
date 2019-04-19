const patientRouter = require('express').Router();

const patientdb = require('../database/dbConfig.js');
const Patients = require('../helpers/patientModel.js');

const authenticate = require('../auth/authenticate.js')

patientRouter.get('/', async (req, res) => {
    try {
        const patients = await Patients.find();
        if(patients.length) {
            res.status(200).json({
                error: false,
                message: 'The Patients were found in the database',
                patients
            });
        } else {
            res.status(404).json({                
                patients: [],
                message: 'The patient array is empty'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            patients: [],
            message: `There was an error processing your request: ${error}`
        });
    }
});

patientRouter.get('/:id', async (req, res) => {
    try {
        const patient = await Patients.findById(req.params.id);
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

// Find all patients with corresponding vaccines route
patientRouter.get('/patients-vaccines/:id', async (req, res) => {
    try {
        const patients = await Patients.findAllPatientsAndVaccines(req.params.id);
        if(patients.length) {
            res.status(200).json({
                error: false,
                message: 'Your family members and vaccines were found successfully',
                patients
            });
        } else {
            res.status(200).json({
                error: true,
                message: 'Your family members and vaccines could not be found',
                patients: []
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            patients: [],
            message: `There was an error processing your request: ${error}`
        });
    }
});

// See the vaccines for each patient
patientRouter.get('/:id/vaccines', async (req, res) => {
    patientdb('patientInfo').where(req.params).first().then(patient => {
        patientdb('vaccines').where({ patientInfo_id: req.params.id }).then(vaccines => {
            patient.vaccines = vaccines;
            res.status(200).json(patient);
        });
    }).catch(error => {
        res.status(500).json({ message: `Error occurred while getting patients' vaccines: ${error}`})
    });    
 });

// Create new Patient
patientRouter.post('/', async (req, res) => {
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
            Patients.insert(newPatient).then(patient => {
                res.status(201).json(patient);
            });        
        } catch (error) {
            res.status(500).json({
                error: `There was an error while saving the patient to the database`
            });
        }
    }
   
});

patientRouter.put('/:id', async (req, res) => {
    try {
        const patient = await Patients.update(req.params.id, req.body);
        if(patient) {
            const updatedPatient = await Patients.findById(req.params.id);
            res.status(200).json({
                error: false,
                message: 'The patient was updated in the database',
                patient: updatedPatient
            });
        } else {
            res.status(404).json({
                error: true,
                patient: {},
                message: 'The patient could not be updated in the database.'
            });
        }
    } catch (error) {
        res.status(500).json({
            error: true,
            patients: {},
            message: `There was an error processing your request: ${error}`
        });
    }
});

patientRouter.delete('/:id', async (req, res) => {
    try {
        const patient = await Patients.remove(req.params.id);
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

module.exports = patientRouter;