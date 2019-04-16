exports.seed = function(knex, Promise) {
  return knex("vaccines")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("vaccines").insert([
        {
          immunizationName: "BCG",
          dateReceived: "1/1/11",
          placeReceived: "Mayo Outpatient Clinic",
          givenBy: "Dr. Qyburn",
          nextShotDue: "4/1/11",
          doseInfo: "3 doses needed every 3 months",
          doseNumber: "dose 2 of 3 doses",
          hasAccess: false,
          patientInfo_id: 1,
          practitioner_id: 1
        },
        {
          immunizationName: "DTaP",
          dateReceived: "2/1/11",
          placeReceived: "Mayo Outpatient Clinic",
          givenBy: "Dr. Dondarion",
          nextShotDue: "NA",
          doseInfo: "1 dose needed every 10 years",
          doseNumber: "dose 1",
          hasAccess: false,
          patientInfo_id: 1,
          practitioner_id: 1
        }
      ]);
    });
};
