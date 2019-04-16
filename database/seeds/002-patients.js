exports.seed = function(knex, Promise) {
  return knex("patientInfo")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("patientInfo").insert([
    {
      firstName: "Sandor",
      lastName: "Clegane",
      gender: "M",
      dateOfBirth: "11/17/1000",
      whoCanAccess: "Mayo Outpatient Clinic",
      patientUserId: 2
    }
  ]);
});
};
