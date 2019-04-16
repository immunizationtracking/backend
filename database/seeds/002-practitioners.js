exports.seed = function(knex, Promise) {
  return knex("practitionerInfo")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("practitionerInfo").insert([
        {
          firstName: "Qyburn",
          lastName: "...",
          title: "Dr.",
          nameOfOffice: "Mayo STD Clinic",
          practitionerUserId: 3
        },
        {
          firstName: "Beric",
          lastName: "Dondarion",
          title: "Dr.",
          nameOfOffice: "Mayo Outpatient Clinic",
          practitionerUserId: 4
        }
      ]);
    });
};
