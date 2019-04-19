const request = require("supertest");
const patientServer = require("../api/server.js");
const patientdb = require("../database/dbConfig.js");

describe("patient-router.js", () => {
  //   afterEach(async () => {
  //   await patientdb("patientInfo").truncate();
  // });

  describe("GET /", () => {
    it("should respond with 200 OK", () => {
      return request(patientServer)
        .get("/api/patients")
        .then(response => {
          expect(response.status).toBe(200);
        });
    });
    it("should return JSON", () => {
      return request(patientServer)
        .get("/api/patients")
        .then(res => {
          expect(res.type).toBe("application/json");
        });
    });
    it("should return the patient object", () => {
      let patient = {
        error: false,
        message: "The Patients were found in the database",
        patients: [
          {
            id: 1,
            firstName: "Sandor",
            lastName: "Clegane",
            gender: "M",
            dateOfBirth: "11/17/1000",
            whoCanAccess: "Mayo Outpatient Clinic",
            patientUserId: 2,
            practitionerId: 1
          },
          {
            id: 2,
            firstName: "Arya",
            lastName: "Stark",
            gender: "F",
            dateOfBirth: "4/8/1017",
            whoCanAccess: "Mayo Outpatient Clinic",
            patientUserId: 1,
            practitionerId: null
          }
        ]
      };

      return request(patientServer)
        .get("/api/patients")
        .then(res => {
          expect(res.body).toEqual(patient);
        });
    });
  });

  describe("get /api/patients/:id", () => {
    it("return a single patient if it exits", async () => {
      let response = await request(patientServer).get("/api/patients/1");
      expect(response.body).toEqual({
        error: false,
        message: "The patient was found in the database",
        patient: {
          id: 1,
          firstName: "Sandor",
          lastName: "Clegane",
          gender: "M",
          dateOfBirth: "11/17/1000",
          whoCanAccess: "Mayo Outpatient Clinic",
          patientUserId: 2,
          practitionerId: 1
        }
      });
    });

    it("should respond with 404 status", async () => {
      let response = await request(patientServer).get("/games/3");
      expect(response.status).toBe(404);
    });
  });

  describe("get /api/patients/:id/vaccines", () => {
    it("return list of vaccines for a single patient if it exits", async () => {
      let response = await request(patientServer).get(
        "/api/patients/1/vaccines"
      );
      expect(response.body).toEqual({
        id: 1,
        firstName: "Sandor",
        lastName: "Clegane",
        gender: "M",
        dateOfBirth: "11/17/1000",
        whoCanAccess: "Mayo Outpatient Clinic",
        patientUserId: 2,
        practitionerId: 1,
        vaccines: [
          {
            id: 1,
            immunizationName: "BCG",
            dateReceived: "1/1/11",
            placeReceived: "Mayo STD Clinic",
            givenBy: "Dr. Qyburn",
            nextShotDue: "4/1/11",
            doseInfo: "3 doses needed every 3 months",
            doseNumber: "dose 2 of 3 doses",
            hasAccess: 0,
            patientInfo_id: 1,
            practitioner_id: 1
          },
          {
            id: 2,
            immunizationName: "DTaP",
            dateReceived: "2/1/11",
            placeReceived: "Mayo STD Clinic",
            givenBy: "Dr. Qyburn",
            nextShotDue: "NA",
            doseInfo: "1 dose needed every 10 years",
            doseNumber: "dose 1",
            hasAccess: 0,
            patientInfo_id: 1,
            practitioner_id: 1
          }
        ]
      });
    });

    describe("post(/api/patients)", () => {
      // afterEach(async () => {
      //   await patientdb("patientInfo").truncate();
      // });
      it("should return status 201", async () => {
        const testPatient = {
          firstName: "Gregor",
          lastName: "Clegane",
          gender: "M",
          dateOfBirth: "11/17/1001",
          whoCanAccess: "Mayo STD Clinic",
          patientUserId: 2,
          practitionerId: 1
        };

        let response = await request(patientServer)
          .post("/api/patients")
          .send(testPatient);
        expect(response.status).toBe(201);
      });

      it("return the new patient", async () => {
        const testPatient = {
          firstName: "Gregor",
          lastName: "Clegane",
          gender: "M",
          dateOfBirth: "11/17/1001",
          whoCanAccess: "Mayo STD Clinic",
          patientUserId: 2,
          practitionerId: 1
        };

        let response = await request(patientServer)
          .post("/api/patients")
          .send(testPatient);
        expect(response.body).toEqual({
          id: 4,
          firstName: "Gregor",
          lastName: "Clegane",
          gender: "M",
          dateOfBirth: "11/17/1001",
          whoCanAccess: "Mayo STD Clinic",
          patientUserId: 2,
          practitionerId: 1
        });
      });

      it("return sttus 406 if required information is not filled", async () => {
        const testPatient = {
          lastName: "Clegane",
          gender: "M",
          dateOfBirth: "11/17/1001",
          whoCanAccess: "Mayo STD Clinic",
          patientUserId: 2,
          practitionerId: 1
        };
        let response = await request(patientServer)
          .post("/api/patients")
          .send(testPatient);
        expect(response.status).toBe(406);
      });
    });
  });

  describe("delete /api/patients/:id", () => {
    it("should respond with 204 status", async () => {
      let response = await request(patientServer).delete("/api/patients/3");
      expect(response.status).toBe(200);
    });

    it("should respond with 404 status", async () => {
      let response = await request(patientServer).delete("/api/patients/10");
      expect(response.status).toBe(404);
    });
  });
});
