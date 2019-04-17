exports.seed = function(knex, Promise) {
  return knex("vaccines").insert([
    {
      immunizationName: "BCG",
      dateReceived: "1/1/11",
      placeReceived: "Mayo STD Clinic",
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
      placeReceived: "Mayo STD Clinic",
      givenBy: "Dr. Qyburn",
      nextShotDue: "NA",
      doseInfo: "1 dose needed every 10 years",
      doseNumber: "dose 1",
      hasAccess: false,
      patientInfo_id: 1,
      practitioner_id: 1
    },
    {
      immunizationName: "Polio (IPV)",
      dateReceived: "11/11/11",
      placeReceived: "Mayo Outpatient Clinic",
      givenBy: "Dr. Dondarion",
      nextShotDue: "4/1/11",
      doseInfo: "3 doses needed every 3 months",
      doseNumber: "dose 2 of 3 doses",
      hasAccess: false,
      patientInfo_id: 2,
      practitioner_id: 2
    },
    {
      immunizationName: "Influenza (flu)",
      dateReceived: "12/11/11",
      placeReceived: "Mayo Outpatient Clinic",
      givenBy: "Dr. Dondarion",
      nextShotDue: "4/1/11",
      doseInfo: "Given every year",
      doseNumber: "dose 1 of 1 for the year",
      hasAccess: false,
      patientInfo_id: 2,
      practitioner_id: 2
    }
  ]);
};
