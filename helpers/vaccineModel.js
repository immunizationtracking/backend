const vaccinedb = require('../database/dbConfig.js');

module.exports = {
    find,
    findByPatientId,
    findByPractitionerId,
    findByVaccineId,
    insert,
    update,
    remove,
};

function find() {
    return vaccinedb('vaccines');
};

function findByPatientId(patientInfo_id) {
    return vaccinedb('vaccines').where({ id: patientInfo_id });
};

function findByPractitionerId(practitioner_id) {
    return vaccinedb('vaccines').where({ id: practitioner_id });
};

function findByVaccineId(vaccineId) {
    return vaccinedb('vaccines').where({ id: vaccineId })
}

function insert(vaccine) {
    return vaccinedb('vaccines').insert(vaccine).then(ids => ids);
};

function update(id, changes) {
    return vaccinedb('vaccines').where({ id }).update(changes);
};

function remove(id) {
    return vaccinedb('vaccines').where({ id }).del();
};