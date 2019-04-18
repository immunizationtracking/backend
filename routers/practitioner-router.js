const practitionerRouter = require("express").Router();
const practitionerdb = require("../database/dbConfig.js");

const Practitioners = require("../helpers/practitionerModel.js");

practitionerRouter.get("/", async (req, res) => {
  try {
    const practitioners = await Practitioners.find();
    if (practitioners.length) {
      res.status(200).json({
        error: false,
        message: "The practitioners were found in the database",
        practitioners
      });
    } else {
      res.status(404).json({
        error: true,
        practitioners: [],
        message: "The practitioners could not be found."
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

practitionerRouter.get("/:id", async (req, res) => {
  try {
    const patient = await Practitioners.findById(req.params.id);
    if (patient) {
      res.status(200).json({
        error: false,
        message: "The patient was found in the database",
        patient
      });
    } else {
      res.status(404).json({
        error: true,
        patient: {},
        message: "The patient could not be found in the database"
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

// Find Patients for each practitioner
practitionerRouter.get("/:id/patients", (req, res) => {
  practitionerdb("practitionerInfo")
    .where(req.params)
    .first()
    .then(practitioner => {
      practitionerdb("patientInfo")
        .where({ practitionerId: req.params.id })
        .then(patients => {
          practitioner.patients = patients;
          res.status(200).json(practitioner);
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Error occurred while getting practitioner's patients: ${error}`
        });
    });
});

// Find vaccines each practitioner dealt with
practitionerRouter.get("/:id/vaccines", (req, res) => {
  practitionerdb("practitionerInfo")
    .where(req.params)
    .first()
    .then(practitioner => {
      practitionerdb("vaccines")
        .where({ practitioner_id: req.params.id })
        .then(vaccines => {
          practitioner.vaccines = vaccines;
          res.status(200).json(practitioner);
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `Error occurred while getting vaccine data of the practitioners: ${error}`
        });
    });
});


// Create new Patient
practitionerRouter.post("/", async (req, res) => {
  const { practitionerUserId, firstName, lastName } = req.body;
  if (!practitionerUserId || !firstName || !lastName) {
    res.status(406).json({
      error: true,
      patient: {},
      message: "Please include all required fields and try again"
    });
  } else {
    try {
      const newPatient = req.body;
      Practitioners.insert(newPatient).then(patient => {
        res.status(201).json(patient);
      });
    } catch (error) {
      res.status(500).json({
        error: `There was an error while saving the patient to the database`
      });
    }
  }
});

practitionerRouter.put("/:id", async (req, res) => {
  try {
    const patient = await Practitioners.update(req.params.id, req.body);
    if (patient) {
      const updatedPatient = await Practitioners.findById(req.params.id);
      res.status(200).json({
        error: false,
        message: "The patient was updated in the database",
        patient: updatedPatient
      });
    } else {
      res.status(404).json({
        error: true,
        patient: {},
        message: "The patient could not be updated in teh database."
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

practitionerRouter.delete("/:id", async (req, res) => {
  try {
    const patient = await Practitioners.remove(req.params.id);
    if (patient) {
      res.status(200).json({
        error: false,
        message: "The patient was deleted from the database"
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
      message: "There was an error processing your request"
    });
  }
});

module.exports = practitionerRouter;
