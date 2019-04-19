const vaccinedb = require("../database/dbConfig.js");

module.exports = {
  find,
  findByPatientId,
  findByPractitionerId,
  findByVaccineId,
  insert,
  update,
  remove,
  findByPractitionerPatientId
};

function find() {
  return vaccinedb("vaccines");
}

function findByPatientId(patientId) {
  return vaccinedb("vaccines").where({ patientInfo_id: patientId });
}

function findByPractitionerId(doctorId) {
  return vaccinedb("vaccines").where({ practitioner_id: doctorId });
}
function findByPractitionerPatientId(filterId) {
    return vaccinedb("vaccines").where({ practitioner_id: filterId, patientInfo_id: filterId });
  }

function findByVaccineId(vaccineId) {
  return vaccinedb("vaccines").where({ id: vaccineId });
}

function insert(vaccine) {
  return vaccinedb("vaccines")
    .insert(vaccine)
    .returning("id")
    .then(([id]) => this.findByVaccineId(id));
}

function update(id, changes) {
  return vaccinedb("vaccines")
    .where({ id })
    .update(changes);
}

function remove(id) {
  return vaccinedb("vaccines")
    .where({ id })
    .del();
}
