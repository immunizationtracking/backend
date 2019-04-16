const patientdb = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findAllPatientsAndVaccines,
  insert,
  remove,
  update
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
  return (patients = await patientdb("patientInfo")
    .where({ patientUserId: id})
    .map(patient => {
      const patientVaccines = vaccines.filter(
        vaccine => vaccine.patientInfo_id === patientInfo.id
      );
      return { ...patient, vaccines: patientVaccines };
    }));
}

function insert(patient) {
  return patientdb("patientInfo")
    .insert(patient)
    .then(ids => 1);
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
