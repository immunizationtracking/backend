const request = require('supertest');
const patientServer = require('../api/server.js');
const patientdb = require('../database/dbConfig.js');

describe('patient-router.js', () => {
    //   afterEach(async () => {
    //   await gamesdb("games").truncate();
    // });

    describe('GET /', () => {
        it('should respond with 200 OK', () => {
            return request(patientServer).get('/api/patients').then(response => {
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
                "error": false,
                "message": "The Patients were found in the database",
                "patients": [
                {
                "id": 1,
                "firstName": "Sandor",
                "lastName": "Clegane",
                "gender": "M",
                "dateOfBirth": "11/17/1000",
                "whoCanAccess": "Mayo Outpatient Clinic",
                "patientUserId": 2,
                "practitionerId": 1
                },
                {
                "id": 2,
                "firstName": "Arya",
                "lastName": "Stark",
                "gender": "F",
                "dateOfBirth": "4/8/1017",
                "whoCanAccess": "Mayo Outpatient Clinic",
                "patientUserId": 1,
                "practitionerId": null
                }
                ]
                };
      
            return request(patientServer)
              .get("/api/patients")
              .then(res => {
                expect(res.body).toEqual(patient);
              });
          });
    })

})