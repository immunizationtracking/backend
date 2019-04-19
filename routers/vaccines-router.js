const vaccineRouter = require("express").Router();
const vaccinesdb = require("../database/dbConfig.js");
const Vaccines = require("../helpers/vaccineModel.js");
// const checkRole = require("../auth/checkRole.js");


vaccineRouter.get("/", async (req, res) => {
  try {
    const vaccines = await Vaccines.find();
    if (vaccines.length) {
      res.status(200).json({
        error: false,
        message: "The vaccines were retrieved successfully",
        vaccines
      });
    } else {
      res.status(404).json({
        error: true,
        vaccines: [],
        message: "The vaccines could not be found"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: "There was a problem with your request"
    });
  }
});

vaccineRouter.get("/:id", async (req, res) => {
  try {
    const vaccine = await Vaccines.findByVaccineId(req.params.id);
    if (vaccine) {
      res.status(200).json({
        error: false,
        message: "You vaccine was retrieved successfully",
        vaccine
      });
    } else {
      res.status(404).json({
        error: true,
        vaccine: {},
        message: "Your vaccine could not be found"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      vaccine: {},
      message: `Theere was a problem with your request: ${error}.`
    });
  }
});


vaccineRouter.post("/", async (req, res) => {
  const {
    immunizationName,
    dateReceived,
    placeReceived,
    givenBy,
    doseNumber,
    patientInfo_id,
    practitioner_id
  } = req.body;
  if (
    !immunizationName ||
    !dateReceived ||
    !placeReceived ||
    !givenBy ||
    !doseNumber ||
    !patientInfo_id ||
    !practitioner_id
  ) {
    return res.status(406).json({
      error: true,
      vaccine: {},
      message: "Please include the required data and try again"
    });
  }
  try {
    const vaccine = await Vaccines.insert(req.body);
    if (vaccine) {
      const newVaccine = await Vaccines.find()
        .where({
          ...req.body
        })
        .first();
      if (newVaccine) {
        res.status(200).json({
          error: false,
          message: "Your vaccine was created successfully",
          vaccine: newVaccine
        });
      }
    } else {
      res.status(404).json({
        error: true,
        vaccine: {},
        message: "Your vaccine could not be created."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      vaccine: {},
      message: `There was a problem with your request: ${error}`
    });
  }
});

vaccineRouter.put("/:id", async (req, res) => {
  try {
    const updatedVaccine = await Vaccines.update(req.params.id, req.body);
    if (updatedVaccine) {
      const vaccine = await Vaccines.findByVaccineId(req.params.id);
      if (vaccine) {
        res.status(200).json({
          error: false,
          message: "The vaccine info was updated successfully",
          vaccine
        });
      } else {
        res.status(400).json({
          error: true,
          vaccine: {},
          message: `The vaccine info was updated but could not be returned`
        });
      }
    } else {
      res.status(404).json({
        error: true,
        vaccine: {},
        message: `The vaccine could not be updated: ${error}`
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      vaccine: {},
      message: `There was a problem with your request: ${error}.`
    });
  }
});

//Example code
vaccineRouter.get("/:id/practvaccine", async (req, res) => {
  try {
    const vaccine = await Vaccines.findByPractitionerId(req.params.id);
    if (vaccine) {
      res.status(200).json({
        error: false,
        message: "Your vaccine was retrieved successfully",
        vaccine
      });
    } else {
      res.status(404).json({
        error: true,
        vaccine: {},
        message: "Your vaccine could not be found"
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      vaccine: {},
      message: `Theere was a problem with your request: ${error}.`
    });
  }
});


vaccineRouter.delete("/:id", async (req, res) => {
  try {
    const removedVaccine = await Vaccines.remove(req.params.id);
    if (removedVaccine) {
      res.status(200).json({
        error: false,
        message: "The vaccine was deleted successfully.",
        numDeleted: removedVaccine
      });
    } else {
      res.status(404).json({
        error: true,
        message: "The vaccine could not be deleted",
        numDeleted: 0
      });
    }
  } catch (error) {
    res.status(500).json({
      error: true,
      message: `There was a problem with your request: ${error}.`,
      numDeleted: 0
    });
  }
});

// function access() {
//   return function(req, res, next) {
//     if (
//       req.decodedJwt &&
//       !req.decodedJwt.hasAccess
//     ) {
//       next();
//     } else {
//       res.status(403).json({ message: 'you have no power here' });
//     }
//   };
// };

module.exports = vaccineRouter;
