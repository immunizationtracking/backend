const practitionerdb = require("../database/dbConfig.js");

module.exports = {
  find,
  findById,
  findAllPractitionersAndVaccines,
  insert,
  remove,
  update
};

function find() {
  return practitionerdb("practitionerInfo");
}

function findById(id) {
  return practitionerdb("practitionerInfo")
    .where({ id })
    .first();
}

async function findAllPractitionersAndVaccines(practitionerUserId) {
  const vaccines = await practitionerdb("vaccines").where({
    practitionerUserId
  });
  return (practitioners = await practitionerdb("practitionerInfo")
    .where({ practitionerUserId })
    .map(practitioner => {
      const practitionerVaccines = vaccines.filter(
        vaccine => vaccine.practitioner_id === practitionerInfo.id
      );
      return { ...practitioner, vaccines: practitionerVaccines };
    }));
}

function insert(practitioner) {
  return practitionerdb("practitionerInfo")
    .insert(practitioner)
    .then(ids => 1);
}

function update(id, changes) {
  return practitionerdb("practitionerInfo")
    .where({ id })
    .update(changes);
}

async function remove(id) {
  const vaccines = await practitionerdb("vaccines")
    .where({ practitionerInfo_id: id })
    .delete();
  const practitioner = await practitionerdb("practitionerInfo")
    .where({ id })
    .first()
    .del();
  return practitioner;
}