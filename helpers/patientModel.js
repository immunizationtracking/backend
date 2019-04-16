const patientdb = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findAllPatientsAndVaccines,
  insert,
  remove,
  update,
  getPatientVaccines
};

function find() {
  return patientdb("patientInfo");
}

function findById(id) {
  return patientdb("patientInfo")
    .where({ id })
    .first();
}

async function findAllPatientsAndVaccines(id) {
  const vaccines = await patientdb("vaccines").where({ patientInfo_id: id });
  return patients = await patientdb("patientInfo")
    .where({ patientUserId: id})
    .map(patient => {
      const patientVaccines = vaccines.filter(
        vaccine => vaccine.patientInfo_id === patients.id
      );
      return { ...patient, vaccines: patientVaccines };
    });
};

function getPatientVaccines(patientId) {
  return patientdb("vaccines")
    .where("patientInfo_id", patientId)
    .then(vaccines => vaccines.map(vaccine => ({ ...vaccine })));
}

function insert(patient) {
  return patientdb("patientInfo")
    .insert(patient)
    .then(([id]) => this.findById(id));
}

function update(id, changes) {
  return patientdb("patientInfo")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  const vaccines = await patientdb("vaccines")
    .where({ patientInfo_id: id })
    .delete();
  const patient = await patientdb("patientInfo")
    .where({ id })
    .first()
    .del();
  return patient;
}
