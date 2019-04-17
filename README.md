# backend
backend architect repository

# Backend Architect


## **Back-end Development Role Description**

You have been learning all about NodeJS and Express and SQL in order to craft Web Servers and build API's for consumption by client side applications. You will use these skills to be in charge of building out the back-end API for your project.

## **The `Back End Development` unit explored the following topics:**

- Building RESTful Web APIs with Express and Node.js
- Server-side Routing`,`Express Middleware
- Deployment and Good Practices
- Introduction to Relational Databases and SQL
- Inserting and Modifying Data
- Querying Data, Migrations and Seeding
- Introduction to Data Modeling
- Introduction to Authentication
- Using Sessions and Cookies
- Using JSON Web Tokens (JWT)
- Client Side Authentication
- Introduction to Automated Testing
- Testing React Applications
- Testing Web APIs

## **Your primary role as a Back-end Architect**

You will use your skills to be responsible for the back-end architecture of this project. You will work closely with your Front End Architect and your Scrum Master in order to discover project needs and deliver working Endpoints for your application.

## Grading Rubric:

Use [this rubric](https://docs.google.com/spreadsheets/d/1sFgvt8HtqNCw32YC8Wvrgrdb61oEWPTsBUrvOL3rAGQ/edit#gid=0) to help guide your development processes

# DATA SCHEMA (DATA STRUCTURES)

`users`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "username": "jaime",                      // String, required
  "password": "password",                   // String, required
  "firstName": "admin",                     // String, required
  "lastName": "lannister",                  // String, required
  "email": "jlannister@gmail.com"           // String, required
  "role": "Practitioner" or "Patient"      // String, required
}
```

`practitionerInfo`

```
{
  "id": 1,                                   // Integer (primary key provided by server and autoincrements)
  "firstName": "Qyburn",                    // String, required
  "lastName": "Somebody",                  // String, required
  "title": "Dr.",                         // String
  "nameOfOffice": "Mayo clinic",         // String, required
  "practitionerUserId": 1         // Integer, required (foreign key reference to "users" table)
}
```

`patientInfo`

```
{
  "id": 1,                                   // Integer (primary key provided by server and autoincrements)
  "firstName": "Arya",                      // String, required
  "lastName": "Stark",                     // String, required
  "gender": "F",                          // String
  "dateOfBirth": "4/8/1017",             // String
  "practitionerId": 1                   // Integer, required (foreign key reference to "practitionerInfo" table)
}
```

`vaccines`

```
{
  "id": 1,                                  // Integer (primary key provided by server and autoincrements)
  "patientInfo_id": 1,                     // Integer, required (foreign key reference to "patientInfo" table)
  "practitioner_id": 1,                     // Integer, required (foreign key reference to "practitionerInfo" table)  
  "immunizationName": "BCG",                // String, required
  "dateReceived": "1/1/11",                  // String, required
  "placeReceived": "Mayo Clinic",           // text, required
  "givenBy": "Dr. Qyburn"                   // String, required
  "nextShotDue": "4/1/11"                  // String
  "doseInfo": "3 doses every 3 months"     // text
  "doseNumber": "dose 2"                   // text
  "hasAccess": "false"                     // boolean (defaults to false)
}
```

# SUMMARY TABLE OF API ENDPOINTS

| Table     | Method | Endpoint                              | Description                                                                                                                                                                                    |
| --------- | ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| auth      | POST   | /api/auth/register                    | Creates a new `user` profile using the information sent inside the `body` of the request and returns a message along with the new `user` and a JSON Web Token in the `body` of the response.   |
| auth      | POST   | /api/auth/login                       | Uses the credentials sent inside the `body` to authenticate the user. On successful login, returns a message with the `user` profile and a JSON Web Token token in the `body` of the response. |
| users     | GET    | /api/users                 | Retrieves an array of `user` objects and returns a message with the array in the `body` of the response.                                                                                       |
| users     | GET    | /api/users/:id             | Retrieves a single `user` object and returns a message with the object inside the `body` of the response.                                                                                      |
| users     | PUT    | /api/users/:id             | Updates a `user` in the database using the information sent inside the `body` of the request and returns a message with the updated `user` profile.                                            |
| users     | DELETE | /api/users/:id             | Removes a `user` from the database using the id sent in the URL parameters of the response.                                                                                                    |
| practitioner  | GET    | /api/practitioner              | Retrieves an array of `practitioner` objects and returns a message with the array in the `body` of the response.                                                                                    |
| practitioner  | GET    | /api/practitioner/:id          | Retrieves a single `practitioner` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.  
| practitioner  | GET    | /api/practitioner/:id/patients | Retrieves patients for each `practitioner` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response. 
| practitioner  | GET    | /api/practitioner/:id/vaccines | Retrieves vaccines assigned for each `practitioner` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.                          |
| practitioner  | POST   | /api/practitioner              | Uses the information sent inside the `body` to create a new `practitioner` for a specified user by included `practitionerUserId` and returns a message along with the new `practitioner`.                            |
| practitioner  | PUT    | /api/practitioner/:id          | Uses the information sent inside the `body` to update a single `practitioner` using the id sent in the URL parameters of the request and returns a message along with the updated `practitioner`.        |
| practitioner  | DELETE | /api/practitioner/:id          | Removes a `practitioner` in the database using the id sent in the URL parameters of the request.  
| patients      | GET    | /api/patients              | Retrieves an array of `patient` objects and returns a message with the array in the `body` of the response.                                                                                    |
| patients      | GET    | /api/patients/:id          | Retrieves a single `patient` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response. 
| patients      | GET    | /api/patients/:id/vaccines | Retrieves vaccines assigned for each `patient` object using the id sent in the URL parameters of the request and returns a message with the object inside the `body` of the response.                           |
| patients      | POST   | /api/patients              | Uses the information sent inside the `body` to create a new `patient` for a specified user by included `userId` and returns a message along with the new `journal`.                            |
| patients      | PUT    | /api/patients/:id          | Uses the information sent inside the `body` to update a single `patient` using the id sent in the URL parameters of the request and returns a message along with the updated `journal`.        |
| patients      | DELETE | /api/patients/:id          | Removes a `patient` in the database using the id sent in the URL parameters of the request.                                                                                                  |
| vaccines      | GET    | /api/vaccines              | Retrieves an array of `vaccines` objects and returns a message with the array in the `body` of the response.                                                                                   |
| vaccines      | GET    | /api/vaccines/:id          | Retrieves a single `vaccine` using the id sent in the URL parameters of the request and returns a message with the `vaccines` inside the `body` of the response.        
| vaccines | POST   | /api/vaccines             | Uses the information sent inside the `body` to create a new `vaccine` for the practitioner user by included `practitioner_id` and returns a message along with the new `vaccines`.                          |
| vaccines | PUT    | /api/vaccines/:id         | Uses the information sent inside the `body` to update a single `vaccine` using the id sent in the URL parameters of the request and returns a message along with the updated `vaccines`.      |
| vaccines | DELETE | /api/vaccines/:id         | Removes a `vaccine` in the database using the id sent in the URL parameters of the request.